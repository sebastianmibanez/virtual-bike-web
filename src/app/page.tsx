import Hero from '@/components/Hero'
import Link from 'next/link'

const sections = [
  {
    href: '/tienda',
    label: 'Tienda',
    desc: 'Ropa técnica para ciclismo con el sello Virtual Bike. Jerseys, bib shorts, calcetas y más.',
    cta: 'Ver colección',
    icon: '👕',
  },
  {
    href: '/eventos',
    label: 'Eventos',
    desc: 'Carreras y actividades del equipo durante el año. Próxima edición: Clásica CVBK 2027.',
    cta: 'Ver calendario',
    icon: '🏁',
  },
  {
    href: '/galeria',
    label: 'Galería',
    desc: 'Fotos de nuestras salidas, competencias y momentos del equipo.',
    cta: 'Ver galería',
    icon: '📸',
  },
  {
    href: '/socios',
    label: 'Socios',
    desc: 'Acceso exclusivo para miembros del club. Historial de inscripciones y compras.',
    cta: 'Área socios',
    icon: '⭐',
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* Secciones */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <p
          className="text-center text-white/30 text-xs uppercase tracking-[0.3em] mb-10"
          style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}
        >
          Todo en Virtual Bike
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {sections.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-[#111] border border-white/8 hover:border-[#f5e400]/60 p-6 flex flex-col gap-3 transition-all duration-200"
            >
              <span className="text-2xl">{s.icon}</span>
              <h2
                className="text-white text-2xl uppercase group-hover:text-[#f5e400] transition-colors"
                style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}
              >
                {s.label}
              </h2>
              <p className="text-zinc-500 text-sm flex-1 leading-relaxed">{s.desc}</p>
              <span
                className="text-[#f5e400]/60 group-hover:text-[#f5e400] transition-colors text-xs uppercase tracking-[0.15em]"
                style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}
              >
                {s.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner tienda destacado */}
      <section className="bg-[#f5e400] py-14">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p
              className="text-black/50 text-xs uppercase tracking-[0.25em] mb-1"
              style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}
            >
              Temporada 2026
            </p>
            <h2
              className="text-black text-4xl md:text-5xl uppercase leading-none"
              style={{ fontFamily: 'Barlow Condensed', fontWeight: 900 }}
            >
              Nueva colección<br />disponible
            </h2>
          </div>
          <Link
            href="/tienda"
            className="bg-black text-[#f5e400] px-10 py-4 uppercase font-bold tracking-wider text-sm hover:bg-zinc-900 transition-colors whitespace-nowrap"
            style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: '1rem' }}
          >
            Ver tienda →
          </Link>
        </div>
      </section>
    </>
  )
}
