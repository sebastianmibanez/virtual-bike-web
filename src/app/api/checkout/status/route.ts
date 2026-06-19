import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  const orderNumber = req.nextUrl.searchParams.get('order')
  if (!orderNumber) {
    return NextResponse.json({ error: 'Falta el número de orden' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Sin persistencia configurada: la confirmación usa el resumen del navegador.
  if (!supabase) {
    return NextResponse.json({ orderNumber, status: 'pending', persisted: false })
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select('order_number, customer_name, email, total, items, status')
    .eq('order_number', orderNumber)
    .single()

  if (error || !order) {
    return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 })
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
