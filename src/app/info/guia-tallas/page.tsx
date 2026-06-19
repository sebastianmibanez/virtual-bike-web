import type { Metadata } from 'next'
import InfoShell from '@/components/InfoShell'

export const metadata: Metadata = {
  title: 'Guía de tallas',
  description: 'Tabla de tallas de ropa de ciclismo Virtual Bike: jerseys, bib shorts y kits. Cómo medirte para elegir tu talla.',
}

const ROWS = [
  { talla: 'XS', pecho: '84–88', cintura: '68–72', altura: '160–168' },
  { talla: 'S', pecho: '88–94', cintura: '72–78', altura: '166–174' },
  { talla: 'M', pecho: '94–100', cintura: '78–84', altura: '172–180' },
  { talla: 'L', pecho: '100–106', cintura: '84–90', altura: '178–186' },
  { talla: 'XL', pecho: '106–112', cintura: '90–98', altura: '184–192' },
]

export default function GuiaTallasPage() {
  return (
    <InfoShell
      title="Guía de tallas"
      intro="Nuestras prendas tienen corte deportivo ajustado. Si dudas entre dos tallas y prefieres comodidad, elige la mayor."
      current="/info/guia-tallas"
    >
      <h2>Tabla de tallas (cm)</h2>
      <div className="overflow-x-auto border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#111] border-b border-white/8">
              {['Talla', 'Pecho', 'Cintura', 'Altura'].map(h => (
                <th key={h} className="text-left text-zinc-400 text-xs uppercase tracking-widest px-4 py-3 font-heading" style={{ fontWeight: 700 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(r => (
              <tr key={r.talla} className="border-b border-white/5">
                <td className="px-4 py-3 text-[#f5e400] font-heading" style={{ fontWeight: 800 }}>{r.talla}</td>
                <td className="px-4 py-3 text-zinc-300">{r.pecho}</td>
                <td className="px-4 py-3 text-zinc-300">{r.cintura}</td>
                <td className="px-4 py-3 text-zinc-300">{r.altura}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-zinc-500 text-xs">Medidas referenciales del cuerpo, no de la prenda. Pueden variar ±2 cm según el modelo.</p>

      <h2>Cómo medirte</h2>
      <p>
        <strong>Pecho:</strong> rodea la parte más ancha del pecho, bajo las axilas, con la cinta horizontal.
      </p>
      <p>
        <strong>Cintura:</strong> mide en la parte más estrecha del torso, sin apretar.
      </p>
      <p>
        Para calcetas usa tu número de calzado (35–38, 39–42, 43–46). La gorra es talla única ajustable.
      </p>

      <h2>¿Sigues con dudas?</h2>
      <p>
        Escríbenos por WhatsApp con tu altura, peso y medidas y te recomendamos la talla. También puedes
        solicitar un cambio dentro de 30 días si no te queda bien.
      </p>
    </InfoShell>
  )
}
