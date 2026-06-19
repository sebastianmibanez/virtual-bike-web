'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { firePixelEvent } from '@/components/PixelToast'
import { PRODUCTS, type Product } from '@/data/products'

const CATEGORIES = ['Todos', ...Array.from(new Set(PRODUCTS.map(p => p.category)))]

function fmt(n: number) {
  return '$' + n.toLocaleString('es-CL')
}

function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  function handleAdd() {
    if (!selectedSize) return
    addItem({ id: product.id, name: product.name, price: product.price, size: selectedSize, qty: 1 })
    firePixelEvent('AddToCart', `${product.name} · talla ${selectedSize} · ${fmt(product.price)}`)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="bg-[#111] border border-white/8 flex flex-col group hover:border-white/20 transition-all duration-200">
      {/* Imagen */}
      <Link href={`/tienda/${product.id}`} className="relative h-52 overflow-hidden bg-[#1a1a1a] block" aria-label={`Ver ${product.name}`}>
        {product.photo ? (
          <Image
            src={product.photo}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#111]">
            <span
              style={{
                fontFamily: 'var(--font-condensed)',
                fontWeight: 900,
                fontSize: '3rem',
                color: '#f5e400',
                opacity: 0.15,
              }}
            >
              VBK
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {product.tag && (
          <span
            className="absolute top-3 left-3 bg-[#f5e400] text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-condensed)' }}
          >
            {product.tag}
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-condensed)' }}>
            {product.category}
          </p>
          <h3
            className="text-white text-lg leading-tight"
            style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}
          >
            <Link href={`/tienda/${product.id}`} className="hover:text-[#f5e400] transition-colors">
              {product.name}
            </Link>
          </h3>
        </div>

        <p className="text-[#f5e400] text-xl" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900 }}>
          {fmt(product.price)}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {product.sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
              aria-pressed={selectedSize === size}
              aria-label={`Talla ${size}`}
              className={`text-xs px-2.5 py-1 border transition-all duration-150 ${
                selectedSize === size
                  ? 'border-[#f5e400] bg-[#f5e400] text-black font-bold'
                  : 'border-white/15 text-zinc-400 hover:border-white/40 hover:text-white'
              }`}
              style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700, letterSpacing: '0.05em' }}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={handleAdd}
          disabled={!selectedSize}
          className={`mt-auto w-full py-2.5 text-sm uppercase font-bold tracking-wider transition-all duration-200 ${
            added
              ? 'bg-green-500 text-white'
              : selectedSize
              ? 'bg-[#f5e400] text-black hover:bg-white'
              : 'bg-white/5 text-zinc-600 cursor-not-allowed'
          }`}
          style={{ fontFamily: 'var(--font-condensed)', fontWeight: 800 }}
        >
          {added ? '✓ Agregado' : selectedSize ? 'Agregar al carrito' : 'Selecciona talla'}
        </button>
      </div>
    </div>
  )
}

export default function TiendaPage() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const { totalItems, openCart } = useCart()

  const filtered = activeCategory === 'Todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <div className="pt-20">
      {/* Hero tienda */}
      <section className="bg-[#0d0d0d] border-b border-white/5 py-12 px-4">
        <div className="max-w-6xl mx-auto flex items-end justify-between flex-wrap gap-4">
          <div>
            <p
              className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3"
              style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}
            >
              Virtual Bike · Temporada 2026
            </p>
            <h1
              className="text-white uppercase leading-none"
              style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              Tienda <span style={{ color: '#f5e400' }}>VBK</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-2 max-w-md">
              Ropa técnica de ciclismo diseñada para el equipo. Calidad profesional, identidad Virtual Bike.
            </p>
          </div>
          {totalItems > 0 && (
            <button
              onClick={openCart}
              className="flex items-center gap-2 border border-[#f5e400]/40 text-[#f5e400] px-5 py-2.5 hover:bg-[#f5e400] hover:text-black transition-all text-sm uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-condensed)', fontWeight: 800 }}
            >
              Ver carrito ({totalItems}) →
            </button>
          )}
        </div>
      </section>

      {/* Info strip */}
      <div className="border-b border-white/5 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-6 overflow-x-auto">
          {['📦 Despacho a todo Chile · retiro en Santiago', '📐 Tallas XS a XL', '🤝 Coordinamos el pago contigo', '💬 Consultas por WhatsApp'].map(t => (
            <span key={t} className="text-zinc-500 text-xs whitespace-nowrap" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="sticky top-14 z-30 bg-[#080808]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap text-xs uppercase tracking-widest px-4 py-1.5 border transition-all duration-150 ${
                activeCategory === cat
                  ? 'bg-[#f5e400] border-[#f5e400] text-black font-bold'
                  : 'border-white/15 text-zinc-400 hover:border-white/40 hover:text-white'
              }`}
              style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-zinc-600 text-xs uppercase tracking-widest mb-6" style={{ fontFamily: 'var(--font-condensed)' }}>
          {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Banner contacto */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="border border-white/8 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-2xl uppercase" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 800 }}>
              ¿Necesitas talla especial o pedido de equipo?
            </h3>
            <p className="text-zinc-500 text-sm mt-1">Contáctanos por WhatsApp para pedidos personalizados.</p>
          </div>
          <a
            href="https://wa.me/56999542821"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap border border-[#f5e400]/50 text-[#f5e400] px-6 py-3 uppercase text-sm tracking-wider hover:bg-[#f5e400] hover:text-black transition-all"
            style={{ fontFamily: 'var(--font-condensed)', fontWeight: 800 }}
          >
            WhatsApp →
          </a>
        </div>
      </section>
    </div>
  )
}
