'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { firePixelEvent } from '@/components/PixelToast'
import { type Product, productImages } from '@/data/products'

function fmt(n: number) {
  return '$' + n.toLocaleString('es-CL')
}

export default function ProductDetail({ product }: { product: Product }) {
  const images = productImages(product)
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [added, setAdded] = useState(false)
  const { addItem, openCart } = useCart()

  function handleAdd() {
    if (!selectedSize) return
    addItem({ id: product.id, name: product.name, price: product.price, size: selectedSize, qty: 1 })
    firePixelEvent('AddToCart', `${product.name} · talla ${selectedSize} · ${fmt(product.price)}`)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-zinc-600 text-xs uppercase tracking-widest mb-8 font-heading"
          style={{ fontWeight: 700 }}
          aria-label="Migas de pan"
        >
          <Link href="/tienda" className="hover:text-white transition-colors">Tienda</Link>
          <span aria-hidden>›</span>
          <span className="text-zinc-400">{product.category}</span>
          <span aria-hidden>›</span>
          <span className="text-zinc-500 truncate">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería */}
          <div>
            <div className="relative aspect-square bg-[#111] border border-white/8 overflow-hidden">
              {images.length > 0 ? (
                <Image
                  src={images[activeImg]}
                  alt={`${product.name} — imagen ${activeImg + 1}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  quality={90}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading" style={{ fontWeight: 900, fontSize: '4rem', color: '#f5e400', opacity: 0.15 }}>
                    VBK
                  </span>
                </div>
              )}
              {product.tag && (
                <span
                  className="absolute top-4 left-4 bg-[#f5e400] text-black text-xs font-bold px-2.5 py-1 uppercase tracking-wider font-heading"
                >
                  {product.tag}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    aria-pressed={i === activeImg}
                    className={`relative w-20 h-20 border overflow-hidden transition-all ${
                      i === activeImg ? 'border-[#f5e400]' : 'border-white/10 hover:border-white/40'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-heading" style={{ fontWeight: 700 }}>
              {product.category}
            </p>
            <h1
              className="text-white uppercase leading-none mb-4 font-heading"
              style={{ fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
            >
              {product.name}
            </h1>
            <p className="text-[#f5e400] text-3xl mb-6 font-heading" style={{ fontWeight: 900 }}>
              {fmt(product.price)}
            </p>

            {product.description && (
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">{product.description}</p>
            )}

            {/* Tallas */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-300 text-xs uppercase tracking-widest font-heading" style={{ fontWeight: 700 }}>
                  Talla
                </span>
                <Link href="/info/guia-tallas" className="text-[#f5e400] text-xs uppercase tracking-wider hover:underline font-heading" style={{ fontWeight: 700 }}>
                  Guía de tallas →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
                    aria-pressed={selectedSize === size}
                    aria-label={`Talla ${size}`}
                    className={`min-w-[3rem] text-sm px-3 py-2 border transition-all duration-150 font-heading ${
                      selectedSize === size
                        ? 'border-[#f5e400] bg-[#f5e400] text-black'
                        : 'border-white/15 text-zinc-300 hover:border-white/40 hover:text-white'
                    }`}
                    style={{ fontWeight: 700, letterSpacing: '0.05em' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAdd}
                disabled={!selectedSize}
                className={`flex-1 py-4 uppercase font-bold tracking-wider text-sm transition-all duration-200 font-heading ${
                  added
                    ? 'bg-green-500 text-white'
                    : selectedSize
                    ? 'bg-[#f5e400] text-black hover:bg-white'
                    : 'bg-white/5 text-zinc-600 cursor-not-allowed'
                }`}
                style={{ fontWeight: 800 }}
              >
                {added ? '✓ Agregado al carrito' : selectedSize ? 'Agregar al carrito' : 'Selecciona una talla'}
              </button>
              <button
                onClick={openCart}
                className="border border-white/15 text-zinc-300 px-6 py-4 uppercase font-bold tracking-wider text-sm hover:border-white/40 hover:text-white transition-all font-heading"
                style={{ fontWeight: 800 }}
              >
                Ver carrito
              </button>
            </div>

            {/* Características */}
            {product.features && product.features.length > 0 && (
              <div className="border-t border-white/8 pt-6 mb-6">
                <h2 className="text-white text-sm uppercase tracking-widest mb-3 font-heading" style={{ fontWeight: 700 }}>
                  Características
                </h2>
                <ul className="space-y-2">
                  {product.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-zinc-400 text-sm">
                      <span className="text-[#f5e400] mt-0.5">›</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Envío / confianza */}
            <div className="border-t border-white/8 pt-6 space-y-2 text-sm text-zinc-500">
              <p>📦 Despacho a todo Chile o retiro coordinado en Santiago.</p>
              <p>🔄 Cambios de talla dentro de 30 días. <Link href="/info/cambios" className="text-[#f5e400] hover:underline">Ver política</Link>.</p>
              <p>💬 ¿Dudas? <a href="https://wa.me/56999542821" target="_blank" rel="noopener noreferrer" className="text-[#f5e400] hover:underline">Escríbenos por WhatsApp</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
