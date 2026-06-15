import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import CartDrawer from '@/components/CartDrawer'

export const metadata: Metadata = {
  title: 'Virtual Bike — Tienda y Eventos',
  description: 'Ropa técnica de ciclismo, próximos eventos y comunidad. Virtual-Bike.cl',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/5 bg-[#080808]">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-600 text-sm">
              <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, letterSpacing: '0.05em' }}>
                © {new Date().getFullYear()} Virtual-Bike.cl · Todos los derechos reservados
              </span>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/virtual_bike_cl" target="_blank" rel="noopener noreferrer"
                  className="hover:text-[#f5e400] transition-colors uppercase tracking-widest text-xs"
                  style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}>
                  Instagram
                </a>
                <a href="https://wa.me/56999542821" target="_blank" rel="noopener noreferrer"
                  className="hover:text-[#f5e400] transition-colors uppercase tracking-widest text-xs"
                  style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}>
                  WhatsApp
                </a>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
