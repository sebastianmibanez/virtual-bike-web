import type { Metadata } from 'next'
import GalleryGrid, { type GalleryImage } from '@/components/GalleryGrid'

export const metadata: Metadata = {
  title: 'Galería',
  description: 'Fotos del equipo Virtual Bike y de la Clásica: ruta, comunidad y ambiente de competición en Santiago de Chile.',
  openGraph: {
    title: 'Galería · Virtual Bike',
    description: 'Fotos del equipo y de la Clásica Virtual Bike.',
    images: [{ url: '/clasica/clasica2.jpg', alt: 'Galería Virtual Bike' }],
  },
}

const IMAGES: GalleryImage[] = [
  { src: '/clasica/clasica1.jpg', alt: 'Clásica Virtual Bike — partida' },
  { src: '/clasica/clasica2.jpg', alt: 'Clásica Virtual Bike — pelotón en ruta' },
  { src: '/clasica/clasica3.jpg', alt: 'Equipo Virtual Bike con jersey 2026' },
  { src: '/clasica/clasica4.jpg', alt: 'Ciclistas en la Clásica Virtual Bike' },
  { src: '/clasica/clasica5.jpg', alt: 'Comunidad ciclista Virtual Bike' },
  { src: '/clasica/clasica6.jpg', alt: 'Bib short en acción' },
  { src: '/clasica/clasica7.jpg', alt: 'Meta de la Clásica Virtual Bike' },
  { src: '/equipo/virtual-bike2.jpg', alt: 'Kit completo Virtual Bike' },
  { src: '/equipo/virtual-bike3.jpg', alt: 'Jersey VBK Pro 2026' },
  { src: '/equipo/virtual-bike4.jpg', alt: 'Jersey manga larga VBK' },
  { src: '/equipo/virtual-bike5.jpg', alt: 'Bib Short Pro' },
  { src: '/equipo/virtual-bike6.jpg', alt: 'Bib Short Mujer' },
]

export default function GaleriaPage() {
  return (
    <div className="pt-20">
      {/* Encabezado */}
      <section className="bg-[#0d0d0d] border-b border-white/5 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3 font-heading" style={{ fontWeight: 700 }}>
            Virtual Bike
          </p>
          <h1 className="text-white uppercase leading-none font-heading" style={{ fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            Galería
          </h1>
          <p className="text-zinc-500 text-sm mt-2 max-w-md">
            El equipo, la ruta y la comunidad. Haz clic en cualquier foto para ampliarla.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10 pb-20">
        <GalleryGrid images={IMAGES} />
      </section>
    </div>
  )
}
