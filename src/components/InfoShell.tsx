import Link from 'next/link'

const INFO_LINKS = [
  { label: 'Envíos y despacho', href: '/info/envios' },
  { label: 'Cambios y devoluciones', href: '/info/cambios' },
  { label: 'Guía de tallas', href: '/info/guia-tallas' },
  { label: 'Términos y condiciones', href: '/info/terminos' },
]

export default function InfoShell({
  title,
  intro,
  current,
  children,
}: {
  title: string
  intro?: string
  current: string
  children: React.ReactNode
}) {
  return (
    <div className="pt-20">
      <section className="bg-[#0d0d0d] border-b border-white/5 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-zinc-600 text-xs uppercase tracking-widest mb-4 font-heading" style={{ fontWeight: 700 }} aria-label="Migas de pan">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span aria-hidden>›</span>
            <span className="text-zinc-400">Información</span>
          </nav>
          <h1 className="text-white uppercase leading-none font-heading" style={{ fontWeight: 900, fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}>
            {title}
          </h1>
          {intro && <p className="text-zinc-500 text-sm mt-3 max-w-2xl">{intro}</p>}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-[200px_1fr] gap-10">
        {/* Nav lateral */}
        <aside>
          <p className="text-zinc-600 text-xs uppercase tracking-widest mb-3 font-heading" style={{ fontWeight: 700 }}>
            Información
          </p>
          <ul className="space-y-2">
            {INFO_LINKS.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm transition-colors ${
                    l.href === current ? 'text-[#f5e400]' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-white/8 pt-6">
            <p className="text-zinc-500 text-xs mb-3">¿Otra duda?</p>
            <a
              href="https://wa.me/56999542821"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5e400] text-sm uppercase tracking-wider hover:underline font-heading"
              style={{ fontWeight: 700 }}
            >
              WhatsApp →
            </a>
          </div>
        </aside>

        {/* Contenido */}
        <article className="space-y-6 text-zinc-300 text-sm leading-relaxed [&_h2]:text-white [&_h2]:font-heading [&_h2]:uppercase [&_h2]:text-xl [&_h2]:mt-2 [&_h2]:mb-1 [&_strong]:text-white">
          {children}
        </article>
      </div>
    </div>
  )
}
