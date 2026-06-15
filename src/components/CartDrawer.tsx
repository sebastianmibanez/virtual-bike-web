'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'

function fmt(n: number) {
  return '$' + n.toLocaleString('es-CL')
}

export default function CartDrawer() {
  const { items, open, totalItems, totalPrice, removeItem, setQty, closeCart } = useCart()

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#111] z-50 flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
            Carrito {totalItems > 0 && <span style={{ color: '#f5e400' }}>({totalItems})</span>}
          </span>
          <button onClick={closeCart} className="text-zinc-400 hover:text-white transition-colors text-2xl leading-none">
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-5xl opacity-30">🛒</span>
              <p className="text-zinc-500 text-sm">Tu carrito está vacío</p>
              <button
                onClick={closeCart}
                className="mt-2 text-[#f5e400] text-sm uppercase tracking-widest font-semibold hover:underline"
                style={{ fontFamily: 'Barlow Condensed' }}
              >
                Ver tienda →
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.id}__${item.size}`} className="flex gap-3 border-b border-white/5 pb-4">
                {/* Color block placeholder */}
                <div className="w-16 h-16 bg-[#1a1a1a] border border-white/10 flex-shrink-0 flex items-center justify-center">
                  <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: '0.65rem', color: '#f5e400', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2 }}>VBK</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">Talla: {item.size}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-white/10">
                      <button
                        onClick={() => item.qty > 1 ? setQty(item.id, item.size, item.qty - 1) : removeItem(item.id, item.size)}
                        className="w-7 h-7 text-zinc-400 hover:text-white transition-colors text-sm flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-7 h-7 flex items-center justify-center text-white text-sm">{item.qty}</span>
                      <button
                        onClick={() => setQty(item.id, item.size, item.qty + 1)}
                        className="w-7 h-7 text-zinc-400 hover:text-white transition-colors text-sm flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-white text-sm font-semibold">{fmt(item.price * item.qty)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id, item.size)}
                  className="text-zinc-600 hover:text-red-400 transition-colors self-start text-lg leading-none mt-0.5"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer con total y checkout */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm uppercase tracking-wider">Total</span>
              <span className="text-white text-xl font-bold" style={{ fontFamily: 'Barlow Condensed', fontWeight: 900 }}>{fmt(totalPrice)}</span>
            </div>
            <button
              className="w-full bg-[#f5e400] text-black py-4 uppercase font-bold tracking-wider text-sm hover:bg-white transition-colors"
              style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}
            >
              Ir al checkout →
            </button>
            <p className="text-zinc-600 text-xs text-center">
              Pago seguro vía Getnet / PlaceToPay
            </p>
          </div>
        )}
      </div>
    </>
  )
}
