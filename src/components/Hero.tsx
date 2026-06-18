'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SLIDES = [
  { src: '/clasica/clasica1.jpg', alt: 'Clásica Virtual Bike 2026' },
  { src: '/clasica/clasica2.jpg', alt: 'Clásica Virtual Bike 2026' },
  { src: '/clasica/clasica3.jpg', alt: 'Clásica Virtual Bike 2026' },
  { src: '/clasica/clasica4.jpg', alt: 'Clásica Virtual Bike 2026' },
  { src: '/clasica/clasica5.jpg', alt: 'Clásica Virtual Bike 2026' },
  { src: '/clasica/clasica6.jpg', alt: 'Clásica Virtual Bike 2026' },
  { src: '/clasica/clasica7.jpg', alt: 'Clásica Virtual Bike 2026' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 700)
  }, [animating])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo])

  useEffect(() => {
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [next])

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
      {/* Slideshow */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
          {/* Gradiente superior para que el navbar sea siempre legible */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />
        </div>
      ))}

      {/* Contenido */}
      <div className="absolute left-6 md:left-16 bottom-24 md:bottom-28 z-10 max-w-xl">
        <span
          className="block text-white/50 text-xs uppercase tracking-[0.3em] mb-5 font-semibold"
          style={{ fontFamily: 'Barlow Condensed' }}
        >
          🚴 Equipo de ciclismo · Santiago, Chile
        </span>
        <h1
          className="text-white uppercase leading-[0.86] drop-shadow-2xl"
          style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
        >
          Virtual
          <br />
          <span style={{ color: '#f5e400' }}>Bike</span>
        </h1>
        <p className="text-white/60 text-sm md:text-base leading-relaxed mt-5 mb-7 max-w-sm">
          Ropa técnica, eventos y comunidad ciclista. Todo en un solo lugar.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/tienda"
            className="inline-block bg-[#f5e400] text-black px-8 py-3.5 text-sm uppercase font-bold tracking-wider hover:bg-white transition-all duration-200 hover:scale-105 shadow-xl shadow-[#f5e400]/20"
            style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}
          >
            Ver tienda →
          </Link>
          <Link
            href="/eventos"
            className="inline-block border border-white/30 text-white px-8 py-3.5 text-sm uppercase font-bold tracking-wider hover:border-white transition-all duration-200"
            style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}
          >
            Próximos eventos
          </Link>
        </div>
      </div>

      {/* Flecha izquierda */}
      <button
        onClick={prev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 hover:border-white/70 bg-black/30 hover:bg-black/60 flex items-center justify-center text-white text-xl transition-all backdrop-blur-sm z-10"
      >
        ‹
      </button>

      {/* Flecha derecha */}
      <button
        onClick={next}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 hover:border-white/70 bg-black/30 hover:bg-black/60 flex items-center justify-center text-white text-xl transition-all backdrop-blur-sm z-10"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 right-6 md:right-14 flex items-center gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-7 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
