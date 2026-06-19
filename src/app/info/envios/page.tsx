import type { Metadata } from 'next'
import InfoShell from '@/components/InfoShell'

export const metadata: Metadata = {
  title: 'Envíos y despacho',
  description: 'Cómo y dónde despachamos los productos de Virtual Bike: retiro en Santiago, despacho a regiones, plazos y costos.',
}

export default function EnviosPage() {
  return (
    <InfoShell
      title="Envíos y despacho"
      intro="Despachamos a todo Chile. Estos son los plazos, costos y opciones de entrega."
      current="/info/envios"
    >
      <h2>Opciones de entrega</h2>
      <p>
        <strong>Retiro en Santiago:</strong> coordinamos un punto de entrega en la Región Metropolitana sin costo.
        Te avisamos por WhatsApp cuando tu pedido esté listo.
      </p>
      <p>
        <strong>Despacho a domicilio:</strong> enviamos a todo Chile mediante courier. El costo se calcula según
        la región de destino y se coordina al confirmar el pedido.
      </p>

      <h2>Plazos</h2>
      <p>
        Los productos en stock se preparan en 1 a 3 días hábiles. El tiempo de tránsito del courier depende del
        destino (1 a 3 días hábiles en la Región Metropolitana, 3 a 7 días hábiles en regiones).
      </p>
      <p>
        Para pedidos personalizados o de equipo, el plazo de producción se informa al momento de la compra.
      </p>

      <h2>Costos de envío</h2>
      <p>
        El valor del despacho se confirma antes de cerrar la compra según la región. El retiro coordinado en
        Santiago no tiene costo.
      </p>

      <h2>Seguimiento</h2>
      <p>
        Una vez despachado tu pedido, te enviamos el número de seguimiento por correo y WhatsApp para que sigas
        tu envío en tiempo real.
      </p>
    </InfoShell>
  )
}
