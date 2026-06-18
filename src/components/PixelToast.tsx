'use client'

import { useEffect, useState } from 'react'

type PixelEvent = {
  id: number
  name: string
  detail: string
}

export default function PixelToast() {
  const [events, setEvents] = useState<PixelEvent[]>([])

  useEffect(() => {
    let counter = 0
    const handler = (e: Event) => {
      const { name, detail } = (e as CustomEvent).detail as { name: string; detail: string }
      const id = ++counter
      setEvents(prev => [...prev, { id, name, detail }])
      setTimeout(() => setEvents(prev => prev.filter(ev => ev.id !== id)), 3500)
    }
    window.addEventListener('vbk-pixel', handler)
    return () => window.removeEventListener('vbk-pixel', handler)
  }, [])

  if (events.length === 0) return null

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex flex-col gap-2 pointer-events-none">
      {events.map(ev => (
        <div
          key={ev.id}
          className="flex items-start gap-3 bg-[#0f1f0f] border border-green-500/30 px-4 py-3 max-w-xs animate-fade-in"
        >
          <span className="text-green-400 text-base leading-none mt-0.5">📊</span>
          <div>
            <p
              className="text-green-400 text-xs font-bold uppercase tracking-wider"
              style={{ fontFamily: 'Barlow Condensed', letterSpacing: '0.1em' }}
            >
              Meta Pixel · {ev.name}
            </p>
            <p className="text-green-300/60 text-[11px] mt-0.5">{ev.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function firePixelEvent(name: string, detail: string) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('vbk-pixel', { detail: { name, detail } }))
}
