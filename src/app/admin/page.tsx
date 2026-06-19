'use client'

import Link from 'next/link'

const STATS = [
  { label: 'Ventas del mes', value: '$1.240.000', sub: '23 pedidos', color: '#f5e400' },
  { label: 'Pedidos pagados', value: '18', sub: 'de 23 totales', color: '#4ade80' },
  { label: 'En despacho', value: '2', sub: 'pendientes de envío', color: '#60a5fa' },
  { label: 'Pendientes pago', value: '3', sub: 'últimas 48 horas', color: '#f97316' },
]

const WEEKLY = [
  { day: 'Lun', sales: 8 },
  { day: 'Mar', sales: 12 },
  { day: 'Mié', sales: 6 },
  { day: 'Jue', sales: 15 },
  { day: 'Vie', sales: 23 },
  { day: 'Sáb', sales: 18 },
  { day: 'Hoy', sales: 11 },
]
const MAX_SALES = 23

type OrderStatus = 'pagado' | 'despacho' | 'pendiente'

const ORDERS: { id: string; cliente: string; producto: string; monto: number; estado: OrderStatus; fecha: string }[] = [
  { id: 'VBK-2026-1089', cliente: 'Sebastián Pérez', producto: 'Kit Hombre L', monto: 95000, estado: 'pagado', fecha: 'Hoy, 09:14' },
  { id: 'VBK-2026-1088', cliente: 'Valentina Rodríguez', producto: 'Jersey Pro M + Bib S', monto: 103000, estado: 'despacho', fecha: 'Hoy, 08:33' },
  { id: 'VBK-2026-1087', cliente: 'Felipe Morales', producto: 'Bib Short Pro XL', monto: 58000, estado: 'pendiente', fecha: 'Ayer, 22:47' },
  { id: 'VBK-2026-1086', cliente: 'Carolina López', producto: 'Kit Mujer S', monto: 95000, estado: 'pagado', fecha: 'Ayer, 19:20' },
  { id: 'VBK-2026-1085', cliente: 'Andrés González', producto: 'Jersey ML L', monto: 52000, estado: 'pendiente', fecha: 'Ayer, 15:11' },
  { id: 'VBK-2026-1084', cliente: 'Camila Vásquez', producto: 'Calcetas VBK x3', monto: 24000, estado: 'pagado', fecha: '15 Jun, 11:40' },
  { id: 'VBK-2026-1083', cliente: 'Diego Fuentes', producto: 'Jersey Pro XL + Gorra', monto: 60000, estado: 'pagado', fecha: '15 Jun, 10:22' },
  { id: 'VBK-2026-1082', cliente: 'Isidora Muñoz', producto: 'Kit Mujer M', monto: 95000, estado: 'pagado', fecha: '14 Jun, 16:55' },
]

const BADGE: Record<OrderStatus, { label: string; cls: string }> = {
  pagado: { label: 'Pagado', cls: 'bg-green-500/15 text-green-400 border-green-500/20' },
  despacho: { label: 'En despacho', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/20' },
  pendiente: { label: 'Pendiente', cls: 'bg-orange-500/15 text-orange-400 border-orange-500/20' },
}

function fmt(n: number) { return '$' + n.toLocaleString('es-CL') }

export default function AdminPage() {
  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-[0.25em] mb-1" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}>
              Panel de administración
            </p>
            <h1 className="text-white text-3xl uppercase" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900 }}>
              Virtual Bike <span style={{ color: '#f5e400' }}>Admin</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <Link href="/tienda" className="border border-white/10 text-zinc-400 text-xs px-4 py-2 hover:text-white hover:border-white/30 transition-colors uppercase tracking-wider" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}>
              Ver tienda
            </Link>
            <button className="bg-[#f5e400] text-black text-xs px-4 py-2 uppercase font-bold tracking-wider hover:bg-white transition-colors" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 800 }}>
              Exportar CSV
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {STATS.map(s => (
            <div key={s.label} className="bg-[#111] border border-white/8 p-5">
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}>
                {s.label}
              </p>
              <p className="text-white text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 900, color: s.color }}>
                {s.value}
              </p>
              <p className="text-zinc-600 text-xs mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6 mb-8">
          {/* Tabla de pedidos */}
          <div className="bg-[#111] border border-white/8">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h2 className="text-white uppercase text-base" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 800 }}>Pedidos recientes</h2>
              <span className="text-zinc-600 text-xs">{ORDERS.length} pedidos</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {['ID', 'Cliente', 'Producto', 'Monto', 'Estado', 'Fecha'].map(h => (
                      <th key={h} className="text-left text-zinc-600 text-[10px] uppercase tracking-widest px-5 py-3 font-semibold" style={{ fontFamily: 'var(--font-condensed)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ORDERS.map((o, i) => (
                    <tr key={o.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                      <td className="px-5 py-3 text-zinc-500 text-xs" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}>{o.id}</td>
                      <td className="px-5 py-3 text-white text-sm">{o.cliente}</td>
                      <td className="px-5 py-3 text-zinc-400 text-xs">{o.producto}</td>
                      <td className="px-5 py-3 text-white font-semibold whitespace-nowrap">{fmt(o.monto)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border font-bold ${BADGE[o.estado].cls}`} style={{ fontFamily: 'var(--font-condensed)' }}>
                          {BADGE[o.estado].label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-zinc-500 text-xs whitespace-nowrap">{o.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gráfico semanal */}
          <div className="bg-[#111] border border-white/8 p-5">
            <h2 className="text-white uppercase text-base mb-1" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 800 }}>Pedidos esta semana</h2>
            <p className="text-zinc-500 text-xs mb-6">93 pedidos en los últimos 7 días</p>
            <div className="flex items-end gap-2 h-32">
              {WEEKLY.map(w => (
                <div key={w.day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-zinc-400 text-[10px]">{w.sales}</span>
                  <div
                    className="w-full transition-all"
                    style={{
                      height: `${(w.sales / MAX_SALES) * 100}%`,
                      background: w.day === 'Hoy' ? '#f5e400' : '#27272a',
                      minHeight: '4px',
                    }}
                  />
                  <span className="text-zinc-600 text-[10px]" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}>{w.day}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}>
                Acciones rápidas
              </p>
              {[
                { label: 'Gestionar productos', href: '#' },
                { label: 'Ver todos los pedidos', href: '#' },
                { label: 'Exportar inscritos CSV', href: '#' },
                { label: 'Reenviar QR a cliente', href: '#' },
              ].map(a => (
                <button key={a.label} className="w-full text-left text-zinc-400 hover:text-white text-xs uppercase tracking-wider transition-colors flex items-center justify-between group" style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700 }}>
                  {a.label}
                  <span className="text-zinc-700 group-hover:text-[#f5e400] transition-colors">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Aviso demo */}
        <div className="border border-[#f5e400]/20 bg-[#f5e400]/5 px-5 py-4 flex items-start gap-3">
          <span className="text-[#f5e400] text-base mt-0.5">ℹ</span>
          <p className="text-zinc-400 text-sm">
            <strong className="text-[#f5e400]">Vista demo</strong> — En producción, este panel requiere autenticación JWT y muestra datos reales de Supabase en tiempo real. Los pedidos, stock y reportes se actualizan automáticamente.
          </p>
        </div>
      </div>
    </div>
  )
}
