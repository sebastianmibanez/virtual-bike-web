import Link from 'next/link'

const navLinks = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/galeria', label: 'Galería' },
  { href: '/socios', label: 'Socios' },
]

const sections = [
  { href: '/tienda', label: 'Tienda', desc: 'Ropa técnica para ciclismo con el sello Virtual Bike.', cta: 'Ver colección' },
  { href: '/eventos', label: 'Eventos', desc: 'Carreras y actividades del equipo durante el año.', cta: 'Ver eventos' },
  { href: '/galeria', label: 'Galería', desc: 'Fotos de nuestras salidas y competencias.', cta: 'Ver fotos' },
  { href: '/socios', label: 'Socios', desc: 'Acceso exclusivo para miembros del club.', cta: 'Área socios' },
]

export default function Home() {
  return (
    <>
      <header style={{ borderBottom: '1px solid #1a1a1a' }}>
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-heading text-2xl font-bold tracking-widest uppercase" style={{ color: '#f5e400' }}>
            Virtual Bike
          </Link>
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-zinc-400 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24">
          <p style={{ color: '#f5e400', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.5rem' }}>
            Equipo de ciclismo · Chile
          </p>
          <h1
            className="font-heading font-extrabold uppercase leading-none"
            style={{ fontSize: 'clamp(4.5rem, 15vw, 12rem)', letterSpacing: '-0.02em' }}
          >
            VIRTUAL
            <br />
            <span style={{ color: '#f5e400' }}>BIKE</span>
          </h1>
          <p className="mt-8 text-zinc-400 max-w-md" style={{ fontSize: '1.1rem' }}>
            Tu comunidad de ciclismo. Tienda, eventos, galería y área de socios.
          </p>
          <div className="mt-10 flex gap-4 flex-wrap justify-center">
            <Link href="/tienda" className="btn-primary">Ir a la tienda</Link>
            <Link href="/eventos" className="btn-outline">Ver eventos</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map(s => (
            <Link key={s.href} href={s.href} className="card-section">
              <h2 className="card-title font-heading text-2xl font-bold uppercase tracking-wide">{s.label}</h2>
              <p className="text-zinc-400 text-sm flex-1">{s.desc}</p>
              <span style={{ color: '#f5e400', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {s.cta} →
              </span>
            </Link>
          ))}
        </section>
      </main>

      <footer style={{ borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-zinc-600 text-sm">
          <span>© 2026 Virtual Bike</span>
          <span>Santiago, Chile</span>
        </div>
      </footer>
    </>
  )
}
