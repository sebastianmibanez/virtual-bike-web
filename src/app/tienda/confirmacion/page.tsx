'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type OrderInfo = {
  nombre: string
  email: string
  total: number
  items: number
  orderId: string
}

function fmt(n: number) {
  return '$' + n.toLocaleString('es-CL')
}

export default function ConfirmacionPage() {
  const [order, setOrder] = useState<OrderInfo | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('vbk_order')
      if (raw) {
        setOrder(JSON.parse(raw))
        sessionStorage.removeItem('vbk_order')
      }
    } catch {}
  }, [])

  return (
    <div className="pt-20 pb-16 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Check animado */}
        <div className="mx-auto mb-8 w-20 h-20 rounded-full border-2 border-[#f5e400] flex items-center justify-center">
          <span className="text-[#f5e400] text-4xl leading-none">✓</span>
        </div>

        <p
          className="text-[#f5e400] text-xs uppercase tracking-[0.3em] mb-3"
          style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}
        >
          Pago confirmado
        </p>

        <h1
          className="text-white uppercase leading-tight mb-2"
          style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}
        >
          ¡Pedido<br />recibido!
        </h1>

        {order && (
          <div className="mt-8 bg-[#111] border border-white/8 p-6 text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-500 text-sm">N° de pedido</span>
              <span className="text-[#f5e400] text-sm font-bold" style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}>{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 text-sm">Nombre</span>
              <span className="text-white text-sm">{order.nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 text-sm">Email</span>
              <span className="text-white text-sm">{order.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 text-sm">Productos</span>
              <span className="text-white text-sm">{order.items} ítem{order.items > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-white/8">
              <span className="text-zinc-400 text-base font-semibold">Total pagado</span>
              <span className="text-white text-xl font-bold" style={{ fontFamily: 'Barlow Condensed', fontWeight: 900 }}>{fmt(order.total)}</span>
            </div>
          </div>
        )}

        <div className="mt-6 bg-[#0d1f0d] border border-green-500/20 px-5 py-4 text-left">
          <p className="text-green-400 text-sm">
            📧 Recibirás una confirmación en <strong>{order?.email ?? 'tu email'}</strong> con los detalles del pedido y las instrucciones de despacho.
          </p>
        </div>

        {/* Trust signals */}
        <div className="mt-6 flex justify-center gap-6 flex-wrap">
          {['Pago verificado', 'Email enviado', 'Pedido en proceso'].map(t => (
            <div key={t} className="flex items-center gap-1.5">
              <span className="text-[#f5e400] text-xs">✓</span>
              <span className="text-zinc-500 text-xs uppercase tracking-wider" style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}>{t}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex gap-3 justify-center flex-wrap">
          <Link
            href="/tienda"
            className="bg-[#f5e400] text-black px-8 py-3 uppercase font-bold tracking-wider text-sm hover:bg-white transition-colors"
            style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}
          >
            Seguir comprando →
          </Link>
          <Link
            href="/"
            className="border border-white/15 text-zinc-400 px-8 py-3 uppercase font-bold tracking-wider text-sm hover:border-white/40 hover:text-white transition-colors"
            style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}
          >
            Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
