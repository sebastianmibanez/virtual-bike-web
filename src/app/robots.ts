import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://virtual-bike.cl'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/tienda/checkout', '/tienda/confirmacion'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
