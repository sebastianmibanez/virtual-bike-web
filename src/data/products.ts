export type Product = {
  id: string
  name: string
  price: number
  sizes: string[]
  category: string
  tag?: string
  photo?: string
  featured?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'jersey-pro-2026',
    name: 'Jersey VBK Pro 2026',
    price: 45000,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Jerseys',
    tag: 'Nuevo',
    photo: '/equipo/virtual-bike3.jpg',
    featured: true,
  },
  {
    id: 'jersey-ml-2026',
    name: 'Jersey Manga Larga VBK',
    price: 52000,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Jerseys',
    photo: '/equipo/virtual-bike4.jpg',
  },
  {
    id: 'bib-short-pro',
    name: 'Bib Short Pro',
    price: 58000,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Shorts',
    tag: 'Más vendido',
    photo: '/equipo/virtual-bike5.jpg',
    featured: true,
  },
  {
    id: 'bib-short-mujer',
    name: 'Bib Short Mujer',
    price: 58000,
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Shorts',
    photo: '/equipo/virtual-bike6.jpg',
    featured: true,
  },
  {
    id: 'kit-hombre',
    name: 'Kit Completo Hombre',
    price: 95000,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Kits',
    tag: 'Oferta',
    photo: '/equipo/virtual-bike2.jpg',
    featured: true,
  },
  {
    id: 'kit-mujer',
    name: 'Kit Completo Mujer',
    price: 95000,
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Kits',
    photo: '/equipo/virtual-bike3.jpg',
  },
  {
    id: 'calcetas-vbk',
    name: 'Calcetas VBK (par)',
    price: 8000,
    sizes: ['35-38', '39-42', '43-46'],
    category: 'Accesorios',
  },
  {
    id: 'gorra-vbk',
    name: 'Gorra VBK',
    price: 15000,
    sizes: ['Única'],
    category: 'Accesorios',
  },
]

export const FEATURED = PRODUCTS.filter(p => p.featured)
