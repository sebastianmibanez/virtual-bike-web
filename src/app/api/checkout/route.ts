import { NextRequest, NextResponse } from 'next/server'
import { buildOrderFromCart, generateOrderNumber, validateCustomer, type CustomerInput, type CartLineInput } from '@/lib/orders'
import { createAdminClient } from '@/lib/supabase/admin'

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

  // 2) Sin pasarela de pago todavía: el pedido queda registrado y el pago se
  //    coordina por WhatsApp. La confirmación muestra el resumen y el botón.
  //    (Para enchufar una pasarela en el futuro, basta crear la sesión aquí y
  //    devolver su processUrl como redirectUrl.)
  return NextResponse.json({ orderNumber, redirectUrl: `${returnUrl}&pending=1`, mode: 'manual' })
}
