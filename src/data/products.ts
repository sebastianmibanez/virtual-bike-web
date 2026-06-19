export type Product = {
  id: string
  name: string
  price: number
  sizes: string[]
  category: string
  tag?: string
  photo?: string
  /** Galería de imágenes para la ficha de producto. Si falta, se usa `photo`. */
  images?: string[]
  /** Descripción corta para tarjetas y meta description. */
  shortDescription?: string
  /** Descripción larga para la ficha de producto. */
  description?: string
  /** Características destacadas listadas en la ficha. */
  features?: string[]
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
    images: ['/equipo/virtual-bike3.jpg', '/equipo/virtual-bike4.jpg', '/clasica/clasica3.jpg'],
    shortDescription: 'Jersey de competición en tejido técnico transpirable con corte aerodinámico.',
    description:
      'El Jersey VBK Pro 2026 es la pieza central de la colección del equipo. Tejido técnico de alta transpirabilidad, corte race-fit aerodinámico y tres bolsillos traseros con elástico antideslizante. Cierre frontal full-zip y bandas reflectantes para mayor visibilidad.',
    features: ['Tejido técnico transpirable', 'Corte race-fit aerodinámico', '3 bolsillos traseros + bolsillo con cierre', 'Cierre full-zip', 'Bandas reflectantes'],
    featured: true,
  },
  {
    id: 'jersey-ml-2026',
    name: 'Jersey Manga Larga VBK',
    price: 52000,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Jerseys',
    photo: '/equipo/virtual-bike4.jpg',
    images: ['/equipo/virtual-bike4.jpg', '/equipo/virtual-bike3.jpg'],
    shortDescription: 'Jersey manga larga térmico para entrenamientos en clima frío.',
    description:
      'Jersey de manga larga con tejido térmico cepillado por dentro, ideal para salidas de mañana y temporadas frías. Mantiene la transpirabilidad sin sacrificar el abrigo. Corte ajustado y puños elásticos.',
    features: ['Tejido térmico cepillado', 'Manga larga con puños elásticos', 'Transpirable', '3 bolsillos traseros'],
  },
  {
    id: 'bib-short-pro',
    name: 'Bib Short Pro',
    price: 58000,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Shorts',
    tag: 'Más vendido',
    photo: '/equipo/virtual-bike5.jpg',
    images: ['/equipo/virtual-bike5.jpg', '/equipo/virtual-bike2.jpg'],
    shortDescription: 'Bib short con badana de gel de alta densidad para largas distancias.',
    description:
      'Nuestro bib short más vendido. Badana de gel de alta densidad multi-paneles que reduce la fatiga en distancias largas. Tirantes de malla transpirable, tejido compresivo que mejora el rendimiento y banda inferior de silicona que mantiene todo en su lugar.',
    features: ['Badana de gel multi-panel', 'Tejido compresivo', 'Tirantes de malla transpirable', 'Banda de silicona antideslizante'],
    featured: true,
  },
  {
    id: 'bib-short-mujer',
    name: 'Bib Short Mujer',
    price: 58000,
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Shorts',
    photo: '/equipo/virtual-bike6.jpg',
    images: ['/equipo/virtual-bike6.jpg', '/equipo/virtual-bike2.jpg'],
    shortDescription: 'Bib short con corte y badana específicos para anatomía femenina.',
    description:
      'Bib short diseñado específicamente para la anatomía femenina, con badana de gel adaptada y diseño de tirantes pensado para mayor comodidad. Mismo tejido compresivo y prestaciones del modelo Pro.',
    features: ['Badana específica femenina', 'Tejido compresivo', 'Diseño de tirantes ergonómico', 'Banda de silicona antideslizante'],
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
    images: ['/equipo/virtual-bike2.jpg', '/equipo/virtual-bike3.jpg', '/equipo/virtual-bike5.jpg'],
    shortDescription: 'Jersey Pro + Bib Short Pro en un solo pack con precio especial.',
    description:
      'El kit completo del equipo: Jersey VBK Pro 2026 + Bib Short Pro juntos a precio especial. La forma más conveniente de vestir los colores Virtual Bike de pies a cabeza con prestaciones de competición.',
    features: ['Incluye Jersey VBK Pro + Bib Short Pro', 'Precio pack con descuento', 'Diseño coordinado del equipo', 'Tallas XS a XL'],
    featured: true,
  },
  {
    id: 'kit-mujer',
    name: 'Kit Completo Mujer',
    price: 95000,
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Kits',
    photo: '/equipo/virtual-bike3.jpg',
    images: ['/equipo/virtual-bike3.jpg', '/equipo/virtual-bike6.jpg'],
    shortDescription: 'Jersey + Bib Short con corte femenino en pack con precio especial.',
    description:
      'Kit completo con corte femenino: Jersey VBK + Bib Short Mujer. Mismo precio pack y diseño coordinado del equipo, con cortes y badana específicos para la anatomía femenina.',
    features: ['Incluye Jersey VBK + Bib Short Mujer', 'Corte femenino', 'Precio pack con descuento', 'Diseño coordinado del equipo'],
  },
  {
    id: 'calcetas-vbk',
    name: 'Calcetas VBK (par)',
    price: 8000,
    sizes: ['35-38', '39-42', '43-46'],
    category: 'Accesorios',
    shortDescription: 'Calcetas técnicas de ciclismo con compresión ligera.',
    description:
      'Calcetas técnicas con caña media, compresión ligera y tejido transpirable. Identidad Virtual Bike. Se venden por par.',
    features: ['Compresión ligera', 'Tejido transpirable', 'Caña media', 'Diseño Virtual Bike'],
  },
  {
    id: 'gorra-vbk',
    name: 'Gorra VBK',
    price: 15000,
    sizes: ['Única'],
    category: 'Accesorios',
    shortDescription: 'Gorra de ciclismo clásica, talla única ajustable.',
    description:
      'Gorra de ciclismo de algodón con visera corta, pensada para usar bajo el casco o en el podio. Talla única con ajuste elástico.',
    features: ['Algodón transpirable', 'Visera corta', 'Talla única ajustable', 'Diseño Virtual Bike'],
  },
]

export const FEATURED = PRODUCTS.filter(p => p.featured)

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function productImages(p: Product): string[] {
  if (p.images && p.images.length) return p.images
  if (p.photo) return [p.photo]
  return []
}
