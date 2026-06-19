'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

export type GalleryImage = { src: string; alt: string }

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const close = useCallback(() => setOpenIdx(null), [])
  const next = useCallback(() => setOpenIdx(i => (i === null ? i : (i + 1) % images.length)), [images.length])
  const prev = useCallback(() => setOpenIdx(i => (i === null ? i : (i - 1 + images.length) % images.length)), [images.length])

  useEffect(() => {
    if (openIdx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openIdx, close, next, prev])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setOpenIdx(i)}
            className="relative aspect-square overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#f5e400]"
            aria-label={`Ampliar imagen: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-11 h-11 rounded-full border border-white/20 hover:border-white/70 bg-black/40 text-white text-2xl flex items-center justify-center transition-all z-10"
          >
            ×
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Imagen anterior"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 hover:border-white/70 bg-black/40 text-white text-2xl flex items-center justify-center transition-all z-10"
          >
            ‹
          </button>

          <div className="relative w-[92vw] h-[80vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[openIdx].src}
              alt={images[openIdx].alt}
              fill
              className="object-contain"
              sizes="92vw"
              quality={95}
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Imagen siguiente"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 hover:border-white/70 bg-black/40 text-white text-2xl flex items-center justify-center transition-all z-10"
          >
            ›
          </button>

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-xs uppercase tracking-widest font-heading" style={{ fontWeight: 700 }}>
            {openIdx + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  )
}
