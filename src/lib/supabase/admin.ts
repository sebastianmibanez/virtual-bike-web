import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Cliente de Supabase con service role para operaciones de servidor
 * (crear y actualizar órdenes). La SERVICE ROLE KEY es secreta: va en
 * SUPABASE_SERVICE_ROLE_KEY (sin NEXT_PUBLIC_) y nunca llega al cliente.
 *
 * Si no está configurada, devuelve null y la app degrada con elegancia
 * (el pedido no se persiste, pero el flujo no se rompe).
 */
export function createAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function isOrdersPersistenceConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}
