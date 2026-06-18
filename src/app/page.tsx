import Hero from '@/components/Hero'
import SponsorStrip from '@/components/SponsorStrip'
import CategoryGrid from '@/components/CategoryGrid'
import FeaturedProducts from '@/components/FeaturedProducts'
import Image from 'next/image'
import Link from 'next/link'

const TRUST = [
  { icon: '🛒', text: 'Sin registro requerido' },
  { icon: '🔒', text: 'Pago seguro Getnet' },
  { icon: '📦', text: 'Envío en Santiago' },
  { icon: '💬', text: 'Soporte por WhatsApp' },
]

export default function Home() {
  return (
    <>
      <Hero />
      <SponsorStrip />

      {/* Trust signals */}
      <section className="border-b border-white/5 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {TRUST.map(t => (
            <div key={t.text} className="flex items-center gap-2">
              <span className="text-base">{t.icon}</span>
              <span
                className="text-zinc-400 text-xs uppercase tracking-widest"
                style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}
              >
                {t.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Categorías con parallax */}
      <CategoryGrid />

      {/* Productos destacados */}
      <div className="border-t border-white/5">
        <FeaturedProducts />
      </div>

      {/* Producto destacado editorial */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 overflow-hidden border border-white/8">
          <div className="relative h-72 md:h-auto min-h-[280px]">
            <Image
              src="/equipo/virtual-bike2.jpg"
              alt="Kit Virtual Bike 2026"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
          </div>
          <div className="bg-[#111] p-8 md:p-12 flex flex-col justify-center">
            <span
              className="text-[#f5e400] text-xs uppercase tracking-[0.25em] mb-4 block"
              style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}
            >
              Kit completo · Temporada 2026
            </span>
            <h2
              className="text-white uppercase leading-tight mb-4"
              style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Jersey + Bib Short<br />
              <span style={{ color: '#f5e400' }}>Virtual Bike</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">
              Tejido técnico profesional. Diseño exclusivo del equipo.
              Disponible en tallas XS a XL, hombre y mujer.
            </p>
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className="text-[#f5e400] text-3xl"
                style={{ fontFamily: 'Barlow Condensed', fontWeight: 900 }}
              >
                $95.000
              </span>
              <span className="text-zinc-600 text-sm line-through">$120.000</span>
            </div>
            <Link
              href="/tienda"
              className="inline-block bg-[#f5e400] text-black px-8 py-3.5 uppercase font-bold tracking-wider text-sm hover:bg-white transition-all duration-200 self-start"
              style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}
            >
              Ver en tienda →
            </Link>
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="bg-[#f5e400]">
        <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p
              className="text-black/40 text-xs uppercase tracking-[0.25em] mb-1"
              style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}
            >
              Temporada 2026
            </p>
            <h2
              className="text-black uppercase leading-none"
              style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Nueva colección<br />disponible ahora
            </h2>
          </div>
          <Link
            href="/tienda"
            className="bg-black text-[#f5e400] px-10 py-4 uppercase font-bold tracking-wider text-sm hover:bg-zinc-900 transition-colors whitespace-nowrap"
            style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: '1rem' }}
          >
            Ir a la tienda →
          </Link>
        </div>
      </section>
    </>
  )
}
