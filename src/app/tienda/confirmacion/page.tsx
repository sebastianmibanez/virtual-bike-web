'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const WHATSAPP_NUMBER = '56999542821'

type OrderItem = { name: string; size: string; qty: number; price: number }

type OrderInfo = {
  orderNumber: string
  nombre?: string
  email?: string
  telefono?: string
  direccion?: string
  comuna?: string
  region?: string
  total?: number
  items?: OrderItem[]
}

function fmt(n: number) {
  return '$' + n.toLocaleString('es-CL')
}

function buildWhatsappUrl(order: OrderInfo): string {
  const lines: string[] = [
    `Hola! 🚴 Hice el pedido *${order.orderNumber}* en Virtual Bike.`,
    'Quiero coordinar el pago y el despacho.',
  ]
  if (order.items && order.items.length) {
    lines.push('', 'Detalle:')
    for (const it of order.items) {
      lines.push(`• ${it.name} (${it.size}) x${it.qty} — ${fmt(it.price * it.qty)}`)
    }
  }
  if (typeof order.total === 'number' && order.total > 0) {
    lines.push('', `Total: ${fmt(order.total)}`)
  }
  if (order.nombre) lines.push('', `Nombre: ${order.nombre}`)
  if (order.direccion) {
    const dir = [order.direccion, order.comuna, order.region].filter(Boolean).join(', ')
    lines.push(`Despacho: ${dir}`)
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
}

// Lee el resumen del pedido guardado por el checkout en la sesión del navegador.
function readStoredOrder(orderParam: string | null): OrderInfo | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem('vbk_last_order')
    if (raw) {
      const stored: OrderInfo = JSON.parse(raw)
      if (!orderParam || stored.orderNumber === orderParam) return stored
    }
  } catch {}
  return null
}

function ConfirmacionContent() {
  const params = useSearchParams()
  const orderParam = params.get('order')
  // Inicializamos sincrónicamente desde sessionStorage (sin setState en el effect).
  const [order, setOrder] = useState<OrderInfo | null>(() => {
    const stored = readStoredOrder(orderParam)
    if (stored) return stored
    return orderParam ? { orderNumber: orderParam } : null
  })

  // ¿Ya teníamos el detalle completo en sessionStorage? (evaluado en el render inicial)
  const hasFullDetail = Boolean(order?.items?.length)

  useEffect(() => {
    // Si falta el detalle pero hay número de orden, enriquecemos desde Supabase
    // (si está configurado). El setState ocurre dentro de un callback async.
    if (!orderParam || hasFullDetail) return
    let cancelled = false
    fetch(`/api/checkout/status?order=${encodeURIComponent(orderParam)}`)
      .then(r => r.json())
      .then(data => {
        if (cancelled || !data || data.error) return
        setOrder(prev => ({
          ...(prev ?? { orderNumber: orderParam }),
          nombre: data.customerName ?? prev?.nombre,
          email: data.email ?? prev?.email,
          total: typeof data.total === 'number' ? data.total : prev?.total,
        }))
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [orderParam, hasFullDetail])

  if (!order) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
        <span className="text-5xl opacity-30">🛒</span>
        <h1 className="text-white text-2xl font-heading" style={{ fontWeight: 800 }}>No hay un pedido que mostrar</h1>
        <Link href="/tienda" className="bg-[#f5e400] text-black px-8 py-3 uppercase font-bold tracking-wider text-sm font-heading" style={{ fontWeight: 800 }}>
          Ir a la tienda →
        </Link>
      </div>
    )
  }

  const whatsappUrl = buildWhatsappUrl(order)

  return (
    <div className="pt-20 pb-16 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto mb-8 w-20 h-20 rounded-full border-2 border-[#f5e400] flex items-center justify-center">
          <span className="text-[#f5e400] text-4xl leading-none">✓</span>
        </div>

        <p className="text-[#f5e400] text-xs uppercase tracking-[0.3em] mb-3 font-heading" style={{ fontWeight: 700 }}>
          Pedido recibido
        </p>

        <h1 className="text-white uppercase leading-tight mb-2 font-heading" style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
          ¡Pedido<br />recibido!
        </h1>

        {/* Resumen */}
        <div className="mt-8 bg-[#111] border border-white/8 p-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-zinc-500 text-sm">N° de pedido</span>
            <span className="text-[#f5e400] text-sm font-bold font-heading" style={{ fontWeight: 800 }}>{order.orderNumber}</span>
          </div>
          {order.nombre && (
            <div className="flex justify-between">
              <span className="text-zinc-500 text-sm">Nombre</span>
              <span className="text-white text-sm">{order.nombre}</span>
            </div>
          )}

          {order.items && order.items.length > 0 && (
            <div className="pt-3 border-t border-white/8 space-y-2">
              {order.items.map((it, i) => (
                <div key={i} className="flex justify-between gap-2 text-sm">
                  <span className="text-zinc-300 min-w-0 truncate">{it.name} <span className="text-zinc-500">({it.size}) x{it.qty}</span></span>
                  <span className="text-white whitespace-nowrap">{fmt(it.price * it.qty)}</span>
                </div>
              ))}
            </div>
          )}

          {typeof order.total === 'number' && order.total > 0 && (
            <div className="flex justify-between pt-3 border-t border-white/8">
              <span className="text-zinc-400 text-base font-semibold">Total</span>
              <span className="text-white text-xl font-bold font-heading" style={{ fontWeight: 900 }}>{fmt(order.total)}</span>
            </div>
          )}
        </div>

        {/* Paso siguiente: coordinar por WhatsApp */}
        <div className="mt-6 bg-[#0d1f0d] border border-green-500/20 px-5 py-4 text-left">
          <p className="text-green-400 text-sm">
            💬 Para completar tu compra, coordina el <strong>pago y el despacho</strong> con nosotros por WhatsApp.
            Ya tenemos tu pedido registrado.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-black py-4 uppercase font-bold tracking-wider text-sm hover:brightness-110 transition-all font-heading flex items-center justify-center gap-2"
            style={{ fontWeight: 800 }}
          >
            Coordinar pago por WhatsApp →
          </a>
          <Link
            href="/tienda"
            className="w-full border border-white/15 text-zinc-400 py-3 uppercase font-bold tracking-wider text-sm hover:border-white/40 hover:text-white transition-colors font-heading"
            style={{ fontWeight: 800 }}
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmacionPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-zinc-500">Cargando...</div>}>
      <ConfirmacionContent />
    </Suspense>
  )
}
