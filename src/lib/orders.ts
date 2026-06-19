import { getProduct } from '@/data/products'

export type CartLineInput = { id: string; size: string; qty: number }

export type OrderLine = {
  id: string
  name: string
  size: string
  qty: number
  price: number
  lineTotal: number
}

export type CustomerInput = {
  nombre: string
  email: string
  telefono: string
  direccion: string
  comuna: string
  region: string
  notas?: string
}

export type ValidatedOrder = {
  lines: OrderLine[]
  subtotal: number
  total: number
}

/**
 * Recalcula la orden desde el catálogo del servidor: NUNCA confía en el
 * precio enviado por el cliente. Descarta líneas inválidas.
 */
export function buildOrderFromCart(items: CartLineInput[]): ValidatedOrder {
  const lines: OrderLine[] = []
  for (const item of items) {
    const product = getProduct(item.id)
    if (!product) continue
    if (!product.sizes.includes(item.size)) continue
    const qty = Math.max(1, Math.min(20, Math.floor(Number(item.qty) || 0)))
    lines.push({
      id: product.id,
      name: product.name,
      size: item.size,
      qty,
      price: product.price,
      lineTotal: product.price * qty,
    })
  }
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0)
  return { lines, subtotal, total: subtotal }
}

/** Número de orden legible y razonablemente único: VBK-2026-XXXXXX */
export function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(100000 + Math.random() * 900000)
  return `VBK-${year}-${rand}`
}

export function validateCustomer(c: Partial<CustomerInput>): string[] {
  const errors: string[] = []
  if (!c.nombre?.trim()) errors.push('nombre')
  if (!c.email?.includes('@')) errors.push('email')
  if (!c.telefono || c.telefono.replace(/\D/g, '').length < 8) errors.push('telefono')
  if (!c.direccion?.trim()) errors.push('direccion')
  if (!c.comuna?.trim()) errors.push('comuna')
  return errors
}
