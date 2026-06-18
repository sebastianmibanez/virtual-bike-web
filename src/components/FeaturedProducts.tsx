'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { firePixelEvent } from '@/components/PixelToast'
import { FEATURED } from '@/data/products'

function fmt(n: number) { return '$' + n.toLocaleString('es-CL') }

function ProductCard({ product }: { product: typeof FEATURED[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [selectedSize, setSelectedSize] = useState('')
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }, [])

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    if (!selectedSize) return
    addItem({ id: product.id, name: product.name, price: product.price, size: selectedSize, qty: 1 })
    firePixelEvent('AddToCart', `${product.name} · talla ${selectedSize}`)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="flex flex-col group">
      {/* Imagen con parallax */}
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{ height: '340px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMove}
        onMouseLeave={() => { setHovered(false); setPos({ x: 0, y: 0 }) }}
      >
        {product.photo ? (
          <div
            className="absolute inset-[-8%] will-change-transform"
            style={{
              transform: `scale(${hovered ? 1.08 : 1}) translate(${pos.x * -15}px, ${pos.y * -15}px)`,
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <Image
              src={product.photo}
              alt={product.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 25vw"
              quality={85}
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#111] flex items-center justify-center">
            <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: '3rem', color: '#f5e400', opacity: 0.15 }}>VBK</span>
          </div>
        )}

        {/* Overlay en hover */}
        <div
          className="absolute inset-0 transition-all duration-400"
          style={{ background: hovered ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0)' }}
        />

        {product.tag && (
          <span
            className="absolute top-3 left-3 bg-[#f5e400] text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider z-10"
            style={{ fontFamily: 'Barlow Condensed' }}
          >
            {product.tag}
          </span>
        )}

        {/* Tallas aparecen en hover */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3 flex flex-wrap gap-1.5 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)' }}
        >
          {product.sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
              className={`text-xs px-2 py-1 border transition-all duration-150 ${
                selectedSize === size
                  ? 'border-[#f5e400] bg-[#f5e400] text-black font-bold'
                  : 'border-white/40 bg-black/60 text-white hover:border-white backdrop-blur-sm'
              }`}
              style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'Barlow Condensed' }}>
              {product.category}
            </p>
            <h3 className="text-white text-lg leading-tight" style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}>
              {product.name}
            </h3>
          </div>
          <span className="text-[#f5e400] text-lg whitespace-nowrap" style={{ fontFamily: 'Barlow Condensed', fontWeight: 900 }}>
            {fmt(product.price)}
          </span>
        </div>

        <button
          onClick={handleAdd}
          disabled={!selectedSize}
          className={`w-full py-2.5 text-sm uppercase font-bold tracking-wider transition-all duration-200 ${
            added
              ? 'bg-green-500 text-white'
              : selectedSize
              ? 'bg-[#f5e400] text-black hover:bg-white'
              : 'bg-white/5 text-zinc-600 cursor-not-allowed'
          }`}
          style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}
        >
          {added ? '✓ Agregado' : selectedSize ? 'Agregar al carrito' : 'Pasa el cursor · elige talla'}
        </button>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <p
            className="text-white/30 text-xs uppercase tracking-[0.3em] mb-1"
            style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}
          >
            Selección del equipo
          </p>
          <h2
            className="text-white uppercase"
            style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Productos <span style={{ color: '#f5e400' }}>destacados</span>
          </h2>
        </div>
        <Link
          href="/tienda"
          className="text-[#f5e400] text-xs uppercase tracking-widest hover:underline hidden sm:block"
          style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}
        >
          Ver colección completa →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {FEATURED.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/tienda"
          className="text-[#f5e400] text-xs uppercase tracking-widest"
          style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}
        >
          Ver colección completa →
        </Link>
      </div>
    </section>
  )
}
