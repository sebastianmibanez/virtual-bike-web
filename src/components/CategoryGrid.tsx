'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Category = {
  name: string
  count: string
  image: string
  href: string
  tall?: boolean
}

const CATEGORIES: Category[] = [
  { name: 'Jerseys',   count: '4 modelos',    image: '/clasica/clasica3.jpg',       href: '/tienda', tall: true },
  { name: 'Kits',      count: '2 opciones',   image: '/equipo/virtual-bike2.jpg',   href: '/tienda', tall: true },
  { name: 'Shorts',    count: '2 modelos',    image: '/clasica/clasica6.jpg',        href: '/tienda' },
  { name: 'Accesorios',count: 'Calcetas · Gorra', image: '/clasica/clasica1.jpg',   href: '/tienda' },
  { name: 'Eventos',   count: 'Próxima edición', image: '/clasica/clasica7.jpg',    href: '/eventos' },
]

export default function CategoryGrid() {
  const [big, ...rest] = CATEGORIES

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-baseline justify-between mb-6">
        <p
          className="text-white/30 text-xs uppercase tracking-[0.3em]"
          style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}
        >
          Nuestra colección
        </p>
        <Link
          href="/tienda"
          className="text-[#f5e400] text-xs uppercase tracking-widest hover:underline"
          style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}
        >
          Ver todo →
        </Link>
      </div>

      {/* Grid: 1 grande a la izquierda, 4 pequeñas a la derecha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Grande */}
        <div className="md:row-span-2" style={{ minHeight: '500px' }}>
          <Link
            href={big.href}
            className="relative overflow-hidden block h-full group"
            style={{ minHeight: '500px' }}
          >
            <BigCard cat={big} />
          </Link>
        </div>

        {/* Las 4 pequeñas */}
        <div className="grid grid-cols-2 gap-3" style={{ minHeight: '500px' }}>
          {rest.map(cat => (
            <div key={cat.name} style={{ minHeight: '240px' }}>
              <SmallCard cat={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BigCard({ cat }: { cat: Category }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden"
      style={{ minHeight: '500px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => { setHovered(false); setPos({ x: 0, y: 0 }) }}
    >
      <div
        className="absolute inset-[-8%] will-change-transform"
        style={{
          transform: `scale(${hovered ? 1.08 : 1}) translate(${pos.x * -20}px, ${pos.y * -20}px)`,
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <Image src={cat.image} alt={cat.name} fill className="object-cover object-center" quality={90} sizes="50vw" />
      </div>
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.1) 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
        <div>
          <h3
            className="text-white uppercase leading-none"
            style={{
              fontFamily: 'var(--font-condensed)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
              transition: 'transform 0.35s ease-out',
            }}
          >
            {cat.name}
          </h3>
          <p
            className="text-white/50 text-xs uppercase tracking-widest mt-2"
            style={{
              fontFamily: 'var(--font-condensed)', fontWeight: 700,
              transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
              transition: 'transform 0.35s ease-out 0.03s',
            }}
          >
            {cat.count}
          </p>
        </div>
        <span
          className="text-[#f5e400] uppercase tracking-wider"
          style={{
            fontFamily: 'var(--font-condensed)', fontWeight: 800, fontSize: '1rem',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(12px)',
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          }}
        >
          Ver →
        </span>
      </div>
    </div>
  )
}

function SmallCard({ cat }: { cat: Category }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden"
      style={{ minHeight: '240px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => { setHovered(false); setPos({ x: 0, y: 0 }) }}
    >
      <div
        className="absolute inset-[-8%] will-change-transform"
        style={{
          transform: `scale(${hovered ? 1.1 : 1}) translate(${pos.x * -15}px, ${pos.y * -15}px)`,
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <Image src={cat.image} alt={cat.name} fill className="object-cover object-center" quality={85} sizes="25vw" />
      </div>
      <div
        className="absolute inset-0 transition-all duration-400"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3
          className="text-white uppercase leading-none"
          style={{
            fontFamily: 'var(--font-condensed)', fontWeight: 900, fontSize: '1.4rem',
            transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {cat.name}
        </h3>
        <p
          className="text-white/50 text-[10px] uppercase tracking-widest mt-1"
          style={{
            fontFamily: 'var(--font-condensed)', fontWeight: 700,
            opacity: hovered ? 1 : 0.6,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          {cat.count}
        </p>
      </div>
      {/* Link overlay */}
      <Link href={cat.href} className="absolute inset-0" aria-label={cat.name} />
    </div>
  )
}
