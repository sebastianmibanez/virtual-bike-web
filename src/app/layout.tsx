import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import CartDrawer from '@/components/CartDrawer'
import PixelToast from '@/components/PixelToast'
import SiteFooter from '@/components/SiteFooter'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-condensed',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://virtual-bike.cl'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Virtual Bike — Tienda de ciclismo y eventos',
    template: '%s · Virtual Bike',
  },
  description:
    'Ropa técnica de ciclismo, próximos eventos y comunidad ciclista en Santiago de Chile. Jerseys, kits, bib shorts y accesorios del equipo Virtual Bike.',
  keywords: ['ciclismo', 'ropa ciclismo', 'jersey ciclismo', 'bib short', 'Virtual Bike', 'Santiago', 'Chile'],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'Virtual Bike',
    title: 'Virtual Bike — Tienda de ciclismo y eventos',
    description: 'Ropa técnica de ciclismo, próximos eventos y comunidad ciclista en Santiago de Chile.',
    images: [{ url: '/equipo/virtual-bike2.jpg', width: 1200, height: 630, alt: 'Virtual Bike' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Virtual Bike — Tienda de ciclismo y eventos',
    description: 'Ropa técnica de ciclismo, próximos eventos y comunidad ciclista en Santiago de Chile.',
    images: ['/equipo/virtual-bike2.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`h-full antialiased ${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <PixelToast />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  )
}
