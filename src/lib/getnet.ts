import crypto from 'crypto'

/**
 * Cliente para Getnet Chile (PlaceToPay WebCheckout).
 *
 * Variables de entorno requeridas (SOLO servidor, nunca NEXT_PUBLIC_):
 *   GETNET_LOGIN       — usuario de la API
 *   GETNET_SECRET_KEY  — clave secreta (tranKey)
 *   GETNET_BASE_URL    — p.ej. https://checkout.getnet.cl  (prod)
 *                        o el endpoint de pruebas que entregue Getnet
 *
 * Si las variables no están configuradas, isGetnetConfigured() devuelve false
 * y el checkout usa el flujo de respaldo (coordinación por WhatsApp).
 */

const LOGIN = process.env.GETNET_LOGIN
const SECRET = process.env.GETNET_SECRET_KEY
const BASE_URL = process.env.GETNET_BASE_URL?.replace(/\/$/, '')

export function isGetnetConfigured(): boolean {
  return Boolean(LOGIN && SECRET && BASE_URL)
}

/** Genera el bloque de autenticación WSSE que exige PlaceToPay. */
function buildAuth() {
  const rawNonce = crypto.randomBytes(16)
  const seed = new Date().toISOString()
  // tranKey = Base64( SHA-256( nonce + seed + secretKey ) ) usando el nonce en crudo
  const tranKey = crypto
    .createHash('sha256')
    .update(Buffer.concat([rawNonce, Buffer.from(seed, 'utf8'), Buffer.from(SECRET as string, 'utf8')]))
    .digest('base64')

  return {
    login: LOGIN,
    tranKey,
    nonce: rawNonce.toString('base64'),
    seed,
  }
}

export type CreateSessionInput = {
  reference: string
  description: string
  total: number
  currency?: string
  buyer: { name: string; surname?: string; email: string; mobile?: string }
  returnUrl: string
  ipAddress: string
  userAgent: string
  expirationMinutes?: number
}

export type CreateSessionResult = {
  ok: boolean
  requestId?: string
  processUrl?: string
  message?: string
}

export async function createPaymentSession(input: CreateSessionInput): Promise<CreateSessionResult> {
  if (!isGetnetConfigured()) {
    return { ok: false, message: 'Getnet no está configurado' }
  }

  const expiration = new Date(Date.now() + (input.expirationMinutes ?? 60) * 60_000).toISOString()

  const body = {
    auth: buildAuth(),
    locale: 'es_CL',
    buyer: {
      name: input.buyer.name,
      surname: input.buyer.surname ?? '',
      email: input.buyer.email,
      mobile: input.buyer.mobile ?? '',
    },
    payment: {
      reference: input.reference,
      description: input.description,
      amount: { currency: input.currency ?? 'CLP', total: input.total },
    },
    expiration,
    returnUrl: input.returnUrl,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
  }

  try {
    const res = await fetch(`${BASE_URL}/api/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    })
    const data = await res.json()
    if (data?.status?.status === 'OK' && data.processUrl) {
      return { ok: true, requestId: String(data.requestId), processUrl: data.processUrl }
    }
    return { ok: false, message: data?.status?.message ?? 'No se pudo crear la sesión de pago' }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Error de red con Getnet' }
  }
}

export type PaymentStatus = 'APPROVED' | 'REJECTED' | 'PENDING' | 'FAILED'

export type SessionStatusResult = {
  ok: boolean
  status: PaymentStatus
  message?: string
}

export async function getPaymentStatus(requestId: string): Promise<SessionStatusResult> {
  if (!isGetnetConfigured()) {
    return { ok: false, status: 'PENDING', message: 'Getnet no está configurado' }
  }

  try {
    const res = await fetch(`${BASE_URL}/api/session/${requestId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auth: buildAuth() }),
      cache: 'no-store',
    })
    const data = await res.json()
    const raw: string = data?.status?.status ?? 'PENDING'
    const status: PaymentStatus =
      raw === 'APPROVED' ? 'APPROVED' : raw === 'REJECTED' ? 'REJECTED' : raw === 'PENDING' ? 'PENDING' : 'FAILED'
    return { ok: true, status, message: data?.status?.message }
  } catch (err) {
    return { ok: false, status: 'FAILED', message: err instanceof Error ? err.message : 'Error de red con Getnet' }
  }
}
