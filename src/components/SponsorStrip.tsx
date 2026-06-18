import Image from 'next/image'

const SPONSORS = [
  { src: '/sponsors/shimano.jpg', alt: 'Shimano', bg: false },
  { src: '/sponsors/vittoria.jpg', alt: 'Vittoria', bg: false },
  { src: '/sponsors/cic.jpg', alt: 'CIC', bg: false },
  { src: '/sponsors/mutual.jpg', alt: 'Mutual de Seguridad', bg: false },
  { src: '/sponsors/dronexp.jpg', alt: 'Dronexp', bg: false },
  { src: '/sponsors/cava.jpg', alt: 'Cava', bg: false },
  { src: '/sponsors/virtual.jpg', alt: 'Virtual Bike', bg: true },
  { src: '/sponsors/virtual-ropa.jpg', alt: 'Virtual Ropa', bg: true },
]

export default function SponsorStrip() {
  const repeated = [...SPONSORS, ...SPONSORS, ...SPONSORS]

  return (
    <div className="bg-black border-y border-white/5 py-4 overflow-hidden">
      <div className="flex items-center" style={{ animation: 'sponsor-scroll 28s linear infinite' }}>
        {repeated.map((s, i) => (
          <div key={i} className="flex-shrink-0 mx-8 flex items-center justify-center">
            <div className={`${s.bg ? 'bg-white p-1.5' : ''}`}>
              <Image
                src={s.src}
                alt={s.alt}
                width={100}
                height={36}
                className="h-8 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-300"
                style={{ filter: s.bg ? 'none' : 'brightness(0) invert(1)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
