import Link from 'next/link'

const COL_TIENDA = [
  { label: 'Tienda', href: '/tienda' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Galería', href: '/galeria' },
]

const COL_AYUDA = [
  { label: 'Envíos y despacho', href: '/info/envios' },
  { label: 'Cambios y devoluciones', href: '/info/cambios' },
  { label: 'Guía de tallas', href: '/info/guia-tallas' },
  { label: 'Términos y condiciones', href: '/info/terminos' },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Marca */}
          <div className="col-span-2 md:col-span-1">
            <span
              className="font-heading text-white text-xl uppercase tracking-wider block mb-3"
              style={{ fontWeight: 800 }}
            >
              Virtual<span style={{ color: '#f5e400' }}>Bike</span>
            </span>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Ropa técnica, eventos y comunidad ciclista en Santiago de Chile.
            </p>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="font-heading text-zinc-300 text-xs uppercase tracking-widest mb-3" style={{ fontWeight: 700 }}>
              Explorar
            </h3>
            <ul className="space-y-2">
              {COL_TIENDA.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 hover:text-[#f5e400] transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-heading text-zinc-300 text-xs uppercase tracking-widest mb-3" style={{ fontWeight: 700 }}>
              Ayuda
            </h3>
            <ul className="space-y-2">
              {COL_AYUDA.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-zinc-500 hover:text-[#f5e400] transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-heading text-zinc-300 text-xs uppercase tracking-widest mb-3" style={{ fontWeight: 700 }}>
              Contacto
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/virtual_bike_cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-[#f5e400] transition-colors text-sm"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/56999542821"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-[#f5e400] transition-colors text-sm"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span
            className="font-heading text-zinc-600 text-xs uppercase"
            style={{ fontWeight: 700, letterSpacing: '0.05em' }}
          >
            © {new Date().getFullYear()} Virtual-Bike.cl · Todos los derechos reservados
          </span>
          <span className="text-zinc-700 text-xs">Santiago, Chile · Pago coordinado por WhatsApp</span>
        </div>
      </div>
    </footer>
  )
}
