'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { firePixelEvent } from '@/components/PixelToast'

function fmt(n: number) {
  return '$' + n.toLocaleString('es-CL')
}

const REGIONES = [
  'Región Metropolitana',
  'Valparaíso',
  'O\'Higgins',
  'Maule',
  'Biobío',
  'La Araucanía',
  'Los Lagos',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Tarapacá',
  'Arica y Parinacota',
]

type FormData = {
  nombre: string
  email: string
  telefono: string
  direccion: string
  comuna: string
  region: string
  notas: string
}

const EMPTY: FormData = { nombre: '', email: '', telefono: '', direccion: '', comuna: '', region: 'Región Metropolitana', notas: '' }

export default function CheckoutPage() {
  const { items, totalPrice, clear } = useCart()
  const router = useRouter()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (items.length > 0) {
      firePixelEvent('InitiateCheckout', `${items.length} producto${items.length > 1 ? 's' : ''} · ${fmt(totalPrice)}`)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function validate() {
    const e: Partial<FormData> = {}
    if (!form.nombre.trim()) e.nombre = 'Requerido'
    if (!form.email.includes('@')) e.email = 'Email inválido'
    if (form.telefono.length < 9) e.telefono = 'Requerido'
    if (!form.direccion.trim()) e.direccion = 'Requerido'
    if (!form.comuna.trim()) e.comuna = 'Requerido'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    firePixelEvent('Purchase', `${fmt(totalPrice)} · ${items.length} producto${items.length > 1 ? 's' : ''}`)
    sessionStorage.setItem('vbk_order', JSON.stringify({
      nombre: form.nombre,
      email: form.email,
      total: totalPrice,
      items: items.length,
      orderId: 'VBK-2026-' + (1090 + Math.floor(Math.random() * 10)),
    }))
    await new Promise(r => setTimeout(r, 1800))
    clear()
    router.push('/tienda/confirmacion')
  }

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [k]: e.target.value }))
    setErrors(prev => ({ ...prev, [k]: undefined }))
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="pt-24 pb-16 flex flex-col items-center justify-center gap-6 text-center px-4">
        <span className="text-5xl opacity-30">🛒</span>
        <h1 className="text-white text-2xl" style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}>Tu carrito está vacío</h1>
        <Link href="/tienda" className="bg-[#f5e400] text-black px-8 py-3 uppercase font-bold tracking-wider text-sm" style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}>
          Ir a la tienda →
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-zinc-600 text-xs uppercase tracking-widest mb-8" style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}>
          <Link href="/tienda" className="hover:text-white transition-colors">Tienda</Link>
          <span>›</span>
          <span className="text-zinc-400">Checkout</span>
        </nav>

        <h1 className="text-white text-4xl uppercase mb-8" style={{ fontFamily: 'Barlow Condensed', fontWeight: 900 }}>
          Datos de entrega
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-[1fr_360px] gap-8">
          {/* Formulario */}
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nombre completo" error={errors.nombre}>
                <input value={form.nombre} onChange={set('nombre')} placeholder="Sebastián Pérez" className={inputCls(!!errors.nombre)} />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email} onChange={set('email')} placeholder="tuemail@gmail.com" className={inputCls(!!errors.email)} />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Teléfono" error={errors.telefono}>
                <input value={form.telefono} onChange={set('telefono')} placeholder="+56 9 1234 5678" className={inputCls(!!errors.telefono)} />
              </Field>
              <Field label="Región" error={errors.region}>
                <select value={form.region} onChange={set('region')} className={inputCls(false)}>
                  {REGIONES.map(r => <option key={r}>{r}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Dirección" error={errors.direccion}>
                <input value={form.direccion} onChange={set('direccion')} placeholder="Av. Providencia 1234" className={inputCls(!!errors.direccion)} />
              </Field>
              <Field label="Comuna" error={errors.comuna}>
                <input value={form.comuna} onChange={set('comuna')} placeholder="Providencia" className={inputCls(!!errors.comuna)} />
              </Field>
            </div>
            <Field label="Notas (opcional)">
              <textarea value={form.notas} onChange={set('notas')} rows={3} placeholder="Instrucciones de entrega, departamento, etc." className={inputCls(false) + ' resize-none'} />
            </Field>

            {/* Seguridad */}
            <div className="flex flex-wrap gap-4 pt-2">
              {['Pago 100% seguro', 'Datos encriptados SSL', 'Sin cargos ocultos'].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <span className="text-[#f5e400] text-xs">✓</span>
                  <span className="text-zinc-500 text-xs uppercase tracking-widest" style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen del pedido */}
          <div>
            <div className="bg-[#111] border border-white/8 p-6 sticky top-24">
              <h2 className="text-white text-lg uppercase mb-4" style={{ fontFamily: 'Barlow Condensed', fontWeight: 800 }}>
                Resumen del pedido
              </h2>
              <div className="space-y-3 mb-5">
                {items.map(item => (
                  <div key={`${item.id}__${item.size}`} className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{item.name}</p>
                      <p className="text-zinc-500 text-xs">Talla {item.size} · x{item.qty}</p>
                    </div>
                    <span className="text-white text-sm whitespace-nowrap">{fmt(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/8 pt-4 space-y-2">
                <div className="flex justify-between text-zinc-500 text-sm">
                  <span>Subtotal</span>
                  <span>{fmt(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-zinc-500 text-sm">
                  <span>Envío</span>
                  <span className="text-green-400">Por coordinar</span>
                </div>
                <div className="flex justify-between text-white text-xl font-bold pt-2" style={{ fontFamily: 'Barlow Condensed', fontWeight: 900 }}>
                  <span>Total</span>
                  <span style={{ color: '#f5e400' }}>{fmt(totalPrice)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-5 w-full py-4 uppercase font-bold tracking-wider text-sm transition-all ${loading ? 'bg-zinc-700 text-zinc-500 cursor-wait' : 'bg-[#f5e400] text-black hover:bg-white'}`}
                style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: '1rem' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin text-base">◌</span>
                    Procesando pago...
                  </span>
                ) : (
                  'Pagar con Getnet →'
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-zinc-600 text-[10px] uppercase tracking-wider">Pago seguro vía</span>
                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Getnet · PlaceToPay</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-zinc-400 text-xs uppercase tracking-widest mb-1.5" style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}>
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function inputCls(hasError: boolean) {
  return `w-full bg-[#111] border ${hasError ? 'border-red-500/60' : 'border-white/10'} text-white text-sm px-3 py-2.5 focus:outline-none focus:border-[#f5e400]/50 transition-colors`
}
