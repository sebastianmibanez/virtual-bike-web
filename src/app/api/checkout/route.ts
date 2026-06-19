import { NextRequest, NextResponse } from 'next/server'
import { buildOrderFromCart, generateOrderNumber, validateCustomer, type CustomerInput, type CartLineInput } from '@/lib/orders'
import { createAdminClient } from '@/lib/supabase/admin'
import { createPaymentSession, isGetnetConfigured } from '@/lib/getnet'

export async function POST(req: NextRequest) {
  let payload: { customer?: Partial<CustomerInput>; items?: CartLineInput[] }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const customer = payload.customer ?? {}
  const items = Array.isArray(payload.items) ? payload.items : []

  // Validaciones
  const customerErrors = validateCustomer(customer)
  if (customerErrors.length) {
    return NextResponse.json({ error: 'Datos incompletos', fields: customerErrors }, { status: 400 })
  }

  const order = buildOrderFromCart(items)
  if (order.lines.length === 0) {
    return NextResponse.json({ error: 'El carrito está vacío o contiene productos inválidos' }, { status: 400 })
  }

  const orderNumber = generateOrderNumber()
  const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin
  const returnUrl = `${origin}/tienda/confirmacion?order=${orderNumber}`

  // 1) Persistir la orden (si Supabase está configurado con service role)
  const supabase = createAdminClient()
  if (supabase) {
    const { error } = await supabase.from('orders').insert({
      order_number: orderNumber,
      customer_name: customer.nombre,
      email: customer.email,
      phone: customer.telefono,
      address: customer.direccion,
      comuna: customer.comuna,
      region: customer.region,
      notes: customer.notas ?? null,
      items: order.lines,
      subtotal: order.subtotal,
      total: order.total,
      status: 'pending',
    })
    if (error) {
      console.error('[checkout] Error al guardar la orden en Supabase:', error.message)
      // No abortamos: seguimos con el pago/coordinación aunque falle el registro.
    }
  }

  // 2) Crear sesión de pago Getnet (si está configurado)
  if (isGetnetConfigured()) {
    const [name, ...rest] = (customer.nombre ?? '').trim().split(' ')
    const session = await createPaymentSession({
      reference: orderNumber,
      description: `Compra Virtual Bike ${orderNumber}`,
      total: order.total,
      currency: 'CLP',
      buyer: {
        name: name || (customer.nombre as string),
        surname: rest.join(' '),
        email: customer.email as string,
        mobile: customer.telefono,
      },
      returnUrl,
      ipAddress: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '0.0.0.0',
      userAgent: req.headers.get('user-agent') ?? 'Mozilla/5.0',
    })

    if (session.ok && session.processUrl) {
      if (supabase) {
        await supabase
          .from('orders')
          .update({ getnet_request_id: session.requestId, getnet_process_url: session.processUrl, updated_at: new Date().toISOString() })
          .eq('order_number', orderNumber)
      }
      return NextResponse.json({ orderNumber, redirectUrl: session.processUrl, mode: 'getnet' })
    }

    // Si Getnet falla, no simulamos un pago: informamos el error.
    return NextResponse.json(
      { error: session.message ?? 'No se pudo iniciar el pago con Getnet', orderNumber },
      { status: 502 },
    )
  }

  // 3) Flujo de respaldo sin pasarela: pedido recibido, coordinación por WhatsApp
  return NextResponse.json({ orderNumber, redirectUrl: `${returnUrl}&pending=1`, mode: 'manual' })
}
