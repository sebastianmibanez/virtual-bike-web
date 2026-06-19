import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getPaymentStatus, isGetnetConfigured } from '@/lib/getnet'

const STATUS_MAP: Record<string, string> = {
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PENDING: 'pending',
  FAILED: 'failed',
}

export async function GET(req: NextRequest) {
  const orderNumber = req.nextUrl.searchParams.get('order')
  if (!orderNumber) {
    return NextResponse.json({ error: 'Falta el número de orden' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Sin persistencia configurada: no podemos consultar la orden.
  if (!supabase) {
    return NextResponse.json({ orderNumber, status: 'pending', persisted: false })
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select('order_number, customer_name, email, total, items, status, getnet_request_id')
    .eq('order_number', orderNumber)
    .single()

  if (error || !order) {
    return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 })
  }

  // Si hay sesión Getnet y aún no está resuelta, consultamos el estado real.
  if (isGetnetConfigured() && order.getnet_request_id && order.status === 'pending') {
    const result = await getPaymentStatus(order.getnet_request_id)
    const mapped = STATUS_MAP[result.status] ?? 'pending'
    if (mapped !== order.status) {
      await supabase
        .from('orders')
        .update({ status: mapped, updated_at: new Date().toISOString() })
        .eq('order_number', orderNumber)
      order.status = mapped
    }
  }

  return NextResponse.json({
    orderNumber: order.order_number,
    customerName: order.customer_name,
    email: order.email,
    total: order.total,
    itemCount: Array.isArray(order.items) ? order.items.reduce((s: number, l: { qty: number }) => s + l.qty, 0) : 0,
    status: order.status,
    persisted: true,
  })
}
