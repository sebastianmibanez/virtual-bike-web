import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PRODUCTS, getProduct, productImages } from '@/data/products'
import ProductDetail from '@/components/ProductDetail'

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return { title: 'Producto no encontrado' }

  const desc = product.shortDescription ?? product.description ?? `${product.name} — Virtual Bike`
  const img = productImages(product)[0]

  return {
    title: product.name,
    description: desc,
    openGraph: {
      title: `${product.name} · Virtual Bike`,
      description: desc,
      type: 'website',
      images: img ? [{ url: img, alt: product.name }] : undefined,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://virtual-bike.cl'
  const images = productImages(product).map(src => `${SITE_URL}${src}`)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? product.shortDescription,
    image: images,
    category: product.category,
    brand: { '@type': 'Brand', name: 'Virtual Bike' },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/tienda/${product.id}`,
      priceCurrency: 'CLP',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Virtual Bike' },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  )
}
