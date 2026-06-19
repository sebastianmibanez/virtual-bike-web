import Image from 'next/image'

const SPONSORS = [
  { src: '/sponsors/shimano.jpg', alt: 'Shimano' },
  { src: '/sponsors/vittoria.jpg', alt: 'Vittoria' },
  { src: '/sponsors/cic.jpg', alt: 'CIC' },
  { src: '/sponsors/mutual.jpg', alt: 'Mutual de Seguridad' },
  { src: '/sponsors/dronexp.jpg', alt: 'Dronexp' },
  { src: '/sponsors/cava.jpg', alt: 'Cava' },
  { src: '/sponsors/virtual.jpg', alt: 'Virtual Bike' },
  { src: '/sponsors/virtual-ropa.jpg', alt: 'Virtual Ropa' },
]

export default function SponsorStrip() {
  const repeated = [...SPONSORS, ...SPONSORS, ...SPONSORS]

  return (
    <section className="bg-black border-y border-white/5 py-5 overflow-hidden" aria-label="Marcas y patrocinadores">
      <div className="sponsor-track flex items-center">
        {repeated.map((s, i) => (
          <div key={i} className="flex-shrink-0 mx-6" aria-hidden={i >= SPONSORS.length}>
            {/* Chip blanco uniforme: muestra los logos en su color real sin invertir el JPG */}
            <div className="bg-white rounded-md px-4 py-2 flex items-center justify-center h-12 w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <Image
                src={s.src}
                alt={i < SPONSORS.length ? s.alt : ''}
                width={110}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
