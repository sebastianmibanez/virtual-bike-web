-- Tabla de órdenes para el checkout de Virtual Bike.
-- Ejecutar en el SQL editor de Supabase (o vía CLI: supabase db push).

create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  order_number    text unique not null,
  customer_name   text not null,
  email           text not null,
  phone           text,
  address         text,
  comuna          text,
  region          text,
  notes           text,
  items           jsonb not null default '[]'::jsonb,
  subtotal        integer not null default 0,
  total           integer not null default 0,
  status          text not null default 'pending', -- pending | approved | rejected | failed
  payment_provider text,            -- pasarela usada (null = coordinación por WhatsApp)
  payment_ref      text,            -- id/referencia de la transacción en la pasarela
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists orders_order_number_idx on public.orders (order_number);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- RLS activado: el acceso se hace SOLO desde el servidor con la service role key,
-- que omite RLS. No se crean políticas públicas, así el cliente anónimo no puede
-- leer ni escribir órdenes directamente.
alter table public.orders enable row level security;
