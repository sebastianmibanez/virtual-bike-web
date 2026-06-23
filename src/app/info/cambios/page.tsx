import type { Metadata } from 'next'
import InfoShell from '@/components/InfoShell'

export const metadata: Metadata = {
  title: 'Cambios y devoluciones',
  description: 'Política de cambios de talla y devoluciones de Virtual Bike: plazos, condiciones y cómo solicitarlo.',
}

export default function CambiosPage() {
  return (
    <InfoShell
      title="Cambios y devoluciones"
      intro="Queremos que tu equipamiento te quede perfecto. Estas son las condiciones para cambios y devoluciones."
      current="/info/cambios"
    >
      <h2>Cambios de talla</h2>
      <p>
        Tienes <strong>30 días</strong> desde la recepción para solicitar un cambio de talla, siempre que la
        prenda esté sin uso, con sus etiquetas y en su empaque original.
      </p>

      <h2>Cómo solicitar un cambio</h2>
      <p>
        Escríbenos por WhatsApp con tu número de pedido y la talla que necesitas. Coordinamos el retiro o el
        envío de la nueva prenda según disponibilidad de stock.
      </p>

      <h2>Devoluciones</h2>
      <p>
        Según la Ley del Consumidor (Chile), tienes derecho a devolución si el producto presenta fallas de
        fabricación. En ese caso reponemos la prenda o reembolsamos el valor pagado.
      </p>
      <p>
        Por higiene, no se aceptan cambios ni devoluciones de prendas usadas (salvo falla de fabricación), ni de
        productos en liquidación, salvo que la ley lo exija.
      </p>

      <h2>Reembolsos</h2>
      <p>
        Cuando corresponda un reembolso, se realiza por el mismo medio de pago utilizado, una vez recibida y
        revisada la prenda. El reembolso se realiza por el mismo medio acordado para el pago (ej. transferencia).
      </p>
    </InfoShell>
  )
}
