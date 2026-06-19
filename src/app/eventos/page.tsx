import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Eventos — Clásica Virtual Bike 2026',
  description:
    'Clásica Virtual Bike 2026: la cicletada del equipo en Santiago. Categorías por género y nivel, premios y recorrido. Inscríbete y forma parte de la comunidad.',
  openGraph: {
    title: 'Clásica Virtual Bike 2026',
    description: 'La cicletada del equipo Virtual Bike. Categorías, premios y comunidad.',
    images: [{ url: '/clasica/clasica1.jpg', alt: 'Clásica Virtual Bike 2026' }],
  },
}

const INFO = [
  { label: 'Fecha', value: 'Por confirmar 2026' },
  { label: 'Lugar', value: 'Santiago, Chile' },
  { label: 'Modalidad', value: 'Ruta · todas las categorías' },
  { label: 'Cupos', value: 'Limitados' },
]

const CATEGORIAS = [
  { name: 'Damas', detail: 'Por rango de edad' },
  { name: 'Varones', detail: 'Por rango de edad' },
  { name: 'Master', detail: '40+ años' },
  { name: 'Principiantes', detail: 'Primera cicletada' },
]

const INCLUYE = [
  'Número de competidor y chip de tiempo',
  'Hidratación en ruta y meta',
  'Medallón finisher',
  'Cobertura fotográfica del evento',
  'Premiación por categoría',
]

const FAQ = [
  {
    q: '¿Cómo me inscribo?',
    a: 'La inscripción se realiza en línea. Cuando se abran los cupos publicaremos el enlace aquí y en nuestro Instagram. Puedes escribirnos por WhatsApp para reservar tu interés.',
  },
  {
    q: '¿Necesito ser parte del equipo Virtual Bike?',
    a: 'No. La Clásica está abierta a toda la comunidad ciclista, de cualquier nivel.',
  },
  {
    q: '¿Qué pasa si llueve?',
    a: 'El evento se realiza con cualquier clima, salvo condiciones que pongan en riesgo la seguridad. En ese caso se reprograma y se avisa a los inscritos.',
  },
]

export default function EventosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[460px] overflow-hidden bg-black">
        <Image
          src="/clasica/clasica1.jpg"
          alt="Clásica Virtual Bike 2026"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute left-6 md:left-16 bottom-16 z-10 max-w-2xl">
          <span className="block text-white/50 text-xs uppercase tracking-[0.3em] mb-4 font-heading" style={{ fontWeight: 600 }}>
            🚴 Evento · Santiago, Chile
          </span>
          <h1
            className="text-white uppercase leading-[0.9] drop-shadow-2xl font-heading"
            style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            Clásica<br />
            <span style={{ color: '#f5e400' }}>Virtual Bike 2026</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-5 max-w-md">
            La cicletada del equipo. Pedalea con la comunidad, vive la ruta y compite por categoría.
          </p>
          <div className="flex gap-3 flex-wrap mt-7">
            <a
              href="https://wa.me/56999542821?text=Hola!%20Quiero%20información%20sobre%20la%20Clásica%20Virtual%20Bike%202026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#f5e400] text-black px-8 py-3.5 text-sm uppercase font-bold tracking-wider hover:bg-white transition-all duration-200 font-heading"
              style={{ fontWeight: 800 }}
            >
              Quiero inscribirme →
            </a>
            <Link
              href="/galeria"
              className="inline-block border border-white/30 text-white px-8 py-3.5 text-sm uppercase font-bold tracking-wider hover:border-white transition-all duration-200 font-heading"
              style={{ fontWeight: 800 }}
            >
              Ver galería
            </Link>
          </div>
        </div>
      </section>

      {/* Info rápida */}
      <section className="bg-[#0d0d0d] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {INFO.map(i => (
            <div key={i.label}>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1 font-heading" style={{ fontWeight: 700 }}>
                {i.label}
              </p>
              <p className="text-white text-lg font-heading" style={{ fontWeight: 800 }}>{i.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Descripción + categorías */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-2 font-heading" style={{ fontWeight: 700 }}>
            El evento
          </p>
          <h2 className="text-white uppercase mb-4 font-heading" style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}>
            Una clásica<br /><span style={{ color: '#f5e400' }}>para toda la comunidad</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            La Clásica Virtual Bike reúne cada temporada a cientos de ciclistas en torno a una ruta exigente
            y un ambiente de comunidad. Hay categorías para todos los niveles, desde quienes corren su primera
            cicletada hasta los más competitivos.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            La inscripción incluye número con chip de tiempo, hidratación, medallón finisher y premiación por
            categoría. Las fechas e inscripciones se anuncian aquí y en nuestro Instagram.
          </p>
        </div>

        <div>
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-4 font-heading" style={{ fontWeight: 700 }}>
            Categorías
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {CATEGORIAS.map(c => (
              <div key={c.name} className="border border-white/8 p-4">
                <p className="text-white text-lg font-heading" style={{ fontWeight: 800 }}>{c.name}</p>
                <p className="text-zinc-500 text-xs mt-0.5">{c.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3 font-heading" style={{ fontWeight: 700 }}>
            La inscripción incluye
          </p>
          <ul className="space-y-2">
            {INCLUYE.map(i => (
              <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                <span className="text-[#f5e400] mt-0.5">✓</span>
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Galería teaser */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['/clasica/clasica2.jpg', '/clasica/clasica4.jpg', '/clasica/clasica5.jpg', '/clasica/clasica7.jpg'].map((src, i) => (
            <div key={src} className={`relative overflow-hidden ${i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}>
              <Image src={src} alt="Clásica Virtual Bike" fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/galeria" className="text-[#f5e400] text-sm uppercase tracking-widest hover:underline font-heading" style={{ fontWeight: 700 }}>
            Ver galería completa →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-white uppercase mb-8 font-heading text-center" style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>
            Preguntas <span style={{ color: '#f5e400' }}>frecuentes</span>
          </h2>
          <div className="space-y-4">
            {FAQ.map(f => (
              <details key={f.q} className="group border border-white/8 bg-[#111]">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-white font-heading list-none" style={{ fontWeight: 700 }}>
                  {f.q}
                  <span className="text-[#f5e400] text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#f5e400]">
        <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-black uppercase leading-none font-heading text-center md:text-left" style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
            ¿Te lo vas<br />a perder?
          </h2>
          <a
            href="https://wa.me/56999542821?text=Hola!%20Quiero%20información%20sobre%20la%20Clásica%20Virtual%20Bike%202026"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-[#f5e400] px-10 py-4 uppercase font-bold tracking-wider text-sm hover:bg-zinc-900 transition-colors whitespace-nowrap font-heading"
            style={{ fontWeight: 800, fontSize: '1rem' }}
          >
            Escríbenos por WhatsApp →
          </a>
        </div>
      </section>
    </div>
  )
}
