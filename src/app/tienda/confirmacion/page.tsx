'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type OrderStatus = 'approved' | 'pending' | 'rejected' | 'failed'

type OrderInfo = {
  orderNumber: string
  customerName?: string
  email?: string
  total?: number
  itemCount?: number
  status: OrderStatus
  persisted?: boolean
}

function fmt(n: number) {
  return '$' + n.toLocaleString('es-CL')
}

const WHATSAPP = 'https://wa.me/56999542821'

function ConfirmacionContent() {
  const params = useSearchParams()
  const orderNumber = params.get('order')
  const isManual = params.get('pending') === '1'
  const [order, setOrder] = useState<OrderInfo | null>(null)
  // Solo arrancamos en "cargando" si hay un pedido que consultar.
  const [loading, setLoading] = useState(Boolean(orderNumber))

  useEffect(() => {
    if (!orderNumber) return
    fetch(`/api/checkout/status?order=${encodeURIComponent(orderNumber)}`)
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          setOrder({
            orderNumber: data.orderNumber ?? orderNumber,
            customerName: data.customerName,
            email: data.email,
            total: data.total,
            itemCount: data.itemCount,
            status: (isManual ? 'pending' : data.status) as OrderStatus,
            persisted: data.persisted,
          })
        } else {
          setOrder({ orderNumber, status: 'pending' })
        }
      })
      .catch(() => setOrder({ orderNumber, status: 'pending' }))
      .finally(() => setLoading(false))
  }, [orderNumber, isManual])

  if (loading) {
    return (
      <div className="pt-32 pb-16 min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="animate-spin text-3xl text-[#f5e400]">◌</span>
        <p className="text-zinc-500 text-sm">Verificando tu pedido...</p>
      </div>
    )
  }

  if (!orderNumber || !order) {
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

  const approved = order.status === 'approved'
  const rejected = order.status === 'rejected' || order.status === 'failed'

  const accent = approved ? '#f5e400' : rejected ? '#f87171' : '#f5e400'
  const eyebrow = approved ? 'Pago confirmado' : rejected ? 'Pago no completado' : 'Pedido registrado'
  const title = approved ? '¡Pedido\nconfirmado!' : rejected ? 'No pudimos\nconfirmar el pago' : '¡Pedido\nrecibido!'

  return (
    <div className="pt-20 pb-16 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div
          className="mx-auto mb-8 w-20 h-20 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: accent }}
        >
          <span className="text-4xl leading-none" style={{ color: accent }}>{rejected ? '✕' : '✓'}</span>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] mb-3 font-heading" style={{ fontWeight: 700, color: accent }}>
          {eyebrow}
        </p>

        <h1 className="text-white uppercase leading-tight mb-2 font-heading whitespace-pre-line" style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>
          {title}
        </h1>

        <div className="mt-8 bg-[#111] border border-white/8 p-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-zinc-500 text-sm">N° de pedido</span>
            <span className="text-sm font-bold font-heading" style={{ fontWeight: 800, color: accent }}>{order.orderNumber}</span>
          </div>
          {order.customerName && (
            <div className="flex justify-between">
              <span className="text-zinc-500 text-sm">Nombre</span>
              <span className="text-white text-sm">{order.customerName}</span>
            </div>
          )}
          {order.email && (
            <div className="flex justify-between">
              <span className="text-zinc-500 text-sm">Email</span>
              <span className="text-white text-sm">{order.email}</span>
            </div>
          )}
          {typeof order.itemCount === 'number' && order.itemCount > 0 && (
            <div className="flex justify-between">
              <span className="text-zinc-500 text-sm">Productos</span>
              <span className="text-white text-sm">{order.itemCount} ítem{order.itemCount > 1 ? 's' : ''}</span>
            </div>
          )}
          {typeof order.total === 'number' && order.total > 0 && (
            <div className="flex justify-between pt-3 border-t border-white/8">
              <span className="text-zinc-400 text-base font-semibold">{approved ? 'Total pagado' : 'Total'}</span>
              <span className="text-white text-xl font-bold font-heading" style={{ fontWeight: 900 }}>{fmt(order.total)}</span>
            </div>
          )}
        </div>

        {/* Mensaje según estado — honesto */}
        {approved && (
          <div className="mt-6 bg-[#0d1f0d] border border-green-500/20 px-5 py-4 text-left">
            <p className="text-green-400 text-sm">
              📧 Te enviaremos la confirmación{order.email ? <> a <strong>{order.email}</strong></> : ''} y coordinaremos el
              despacho o retiro por WhatsApp.
            </p>
          </div>
        )}

        {!approved && !rejected && (
          <div className="mt-6 bg-[#1f1d0d] border border-[#f5e400]/20 px-5 py-4 text-left">
            <p className="text-[#f5e400]/90 text-sm">
              Recibimos tu pedido.{' '}
              {order.status === 'pending' && !order.persisted
                ? 'Te contactaremos por WhatsApp para coordinar el pago y el despacho.'
                : 'Si tu pago quedó pendiente, te contactaremos por WhatsApp para completarlo y coordinar el despacho.'}
            </p>
          </div>
        )}

        {rejected && (
          <div className="mt-6 bg-[#1f0d0d] border border-red-500/20 px-5 py-4 text-left">
            <p className="text-red-300 text-sm">
              El pago no se completó y no se realizó ningún cobro. Puedes intentarlo nuevamente o escribirnos por WhatsApp y
              lo resolvemos.
            </p>
          </div>
        )}

        <div className="mt-10 flex gap-3 justify-center flex-wrap">
          {rejected ? (
            <Link href="/tienda/checkout" className="bg-[#f5e400] text-black px-8 py-3 uppercase font-bold tracking-wider text-sm hover:bg-white transition-colors font-heading" style={{ fontWeight: 800 }}>
              Reintentar pago →
            </Link>
          ) : (
            <Link href="/tienda" className="bg-[#f5e400] text-black px-8 py-3 uppercase font-bold tracking-wider text-sm hover:bg-white transition-colors font-heading" style={{ fontWeight: 800 }}>
              Seguir comprando →
            </Link>
          )}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="border border-white/15 text-zinc-400 px-8 py-3 uppercase font-bold tracking-wider text-sm hover:border-white/40 hover:text-white transition-colors font-heading" style={{ fontWeight: 800 }}>
            WhatsApp
          </a>
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
