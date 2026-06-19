'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

const links = [
  { label: 'Tienda', href: '/tienda' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Galería', href: '/galeria' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems, openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/sponsors/virtual-round.jpg"
            alt="Virtual Bike"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <span
            className="text-white text-xl uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-condensed)', fontWeight: 800 }}
          >
            Virtual-Bike.cl
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium drop-shadow-md"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={openCart}
            className="relative text-white/80 hover:text-white transition-colors drop-shadow-md"
            aria-label="Carrito"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#f5e400] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={openCart}
            className="relative text-white"
            aria-label="Carrito"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#f5e400] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
          <button
            className="text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#080808]/98 border-t border-white/5 px-4 py-6 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-zinc-300 text-xl uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/tienda"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-[#f5e400] text-black text-center py-3 uppercase tracking-wider font-bold"
            style={{ fontFamily: 'var(--font-condensed)', fontWeight: 800 }}
          >
            Ver tienda →
          </Link>
        </div>
      )}
    </nav>
  )
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}
