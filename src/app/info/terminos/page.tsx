import type { Metadata } from 'next'
import InfoShell from '@/components/InfoShell'

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Términos y condiciones de compra en Virtual Bike: precios, pagos, despacho y datos personales.',
}

export default function TerminosPage() {
  return (
    <InfoShell
      title="Términos y condiciones"
      intro="Al comprar en Virtual-Bike.cl aceptas las siguientes condiciones."
      current="/info/terminos"
    >
      <h2>1. Productos y precios</h2>
      <p>
        Los precios están expresados en pesos chilenos (CLP) e incluyen IVA. Nos reservamos el derecho de
        modificar precios y disponibilidad sin previo aviso. La compra se confirma una vez aprobado el pago.
      </p>

      <h2>2. Pagos</h2>
      <p>
        Los pagos se procesan de forma segura a través de <strong>Getnet</strong>. Virtual Bike no almacena los
        datos de tu tarjeta; estos son gestionados directamente por la pasarela de pago.
      </p>

      <h2>3. Despacho</h2>
      <p>
        Los plazos y costos de envío se detallan en la sección <strong>Envíos y despacho</strong>. Los tiempos
        son referenciales y pueden variar por factores del courier ajenos a Virtual Bike.
      </p>

      <h2>4. Cambios y devoluciones</h2>
      <p>
        Se rigen por nuestra política de <strong>Cambios y devoluciones</strong> y por la Ley N° 19.496 de
        Protección de los Derechos de los Consumidores.
      </p>

      <h2>5. Datos personales</h2>
      <p>
        Usamos tus datos únicamente para procesar y despachar tu pedido y para contactarte sobre el mismo,
        conforme a la Ley N° 19.628 sobre Protección de la Vida Privada. No compartimos tus datos con terceros
        salvo lo necesario para el despacho y el procesamiento del pago.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Para cualquier consulta sobre estos términos, escríbenos por WhatsApp o a través de nuestro Instagram
        <strong> @virtual_bike_cl</strong>.
      </p>
    </InfoShell>
  )
}
