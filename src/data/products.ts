export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: { id: string; url: string; isPrimary: boolean }[];
  rating: number;
  reviewsCount: number;
  stock: number;
  isFeatured?: boolean;
  discount?: number;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Eminix Chrono-Gold Watch',
    description: 'A masterpiece of horology featuring a 24k gold-plated bezel, sapphire crystal, and genuine Italian alligator leather strap.',
    price: 1299.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    rating: 4.9,
    reviewsCount: 124,
    stock: 5,
    isFeatured: true,
    discount: 5
  },
  {
    id: '2',
    name: 'Mulberry Silk Evening Gown',
    description: 'Hand-stitched 100% pure mulberry silk gown with a minimalist silhouette and elegant drape.',
    price: 849.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?w=800&q=80',
    rating: 4.9,
    reviewsCount: 85,
    stock: 12,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Acoustic Elite Headphones',
    description: 'Studio-grade wireless headphones with active noise cancellation, featuring brushed aluminum and memory foam earcups.',
    price: 549.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    rating: 4.8,
    reviewsCount: 210,
    stock: 10,
    discount: 10
  },
  {
    id: '4',
    name: 'Heritage Calfskin Tote',
    description: 'Full-grain calfskin leather tote bag, vegetable-tanned and finished with hand-polished brass hardware.',
    price: 489.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917033904-491a84b2efbd?w=800&q=80',
    rating: 4.7,
    reviewsCount: 56,
    stock: 8
  },
  {
    id: '5',
    name: 'Obsidian Minimalist Vase',
    description: 'Hand-blown obsidian glass vase with a unique matte finish, perfect for modern minimalist spaces.',
    price: 275.00,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80',
    rating: 4.6,
    reviewsCount: 42,
    stock: 15
  },
  {
    id: '6',
    name: 'Velvet Sandalwood Candle',
    description: 'Luxury soy wax candle infused with rare sandalwood, oud, and bergamot essential oils.',
    price: 85.00,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80',
    rating: 4.9,
    reviewsCount: 156,
    stock: 30
  },
  {
    id: '7',
    name: 'Imperial Cashmere Scarf',
    description: 'Ultra-soft 100% grade-A Mongolian cashmere scarf, lightweight yet exceptionally warm.',
    price: 220.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
    rating: 4.8,
    reviewsCount: 73,
    stock: 12
  },
  {
    id: '8',
    name: 'Quantum Smart Hub',
    description: 'The ultimate smart home controller with a seamless glass interface and integrated AI assistant.',
    price: 399.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    rating: 4.5,
    reviewsCount: 89,
    stock: 20
  },
  {
    id: '9',
    name: 'Egyptian Cotton Suite',
    description: '800-thread-count long-staple Egyptian cotton bedding set for a true five-star hotel experience.',
    price: 410.00,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    rating: 4.7,
    reviewsCount: 64,
    stock: 10
  },
  {
    id: '10',
    name: 'Aviator Gold Sunglasses',
    description: 'Classic aviator frames crafted from lightweight titanium with 18k gold plating and polarized lenses.',
    price: 365.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511499767390-903390e6fbc4?w=800&q=80',
    rating: 4.6,
    reviewsCount: 92,
    stock: 15
  },
  {
    id: '11',
    name: 'Zenith Pro Yoga Mat',
    description: 'Professional-grade natural rubber yoga mat with laser-etched alignment lines and superior grip.',
    price: 145.00,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1592432676556-2845658326f2?w=800&q=80',
    rating: 4.8,
    reviewsCount: 112,
    stock: 25
  },
  {
    id: '12',
    name: 'Aura Sculptural Lamp',
    description: 'A functional piece of art, this LED lamp features a hand-carved marble base and adjustable warmth.',
    price: 259.00,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80',
    rating: 4.5,
    reviewsCount: 38,
    stock: 10
  },
  {
    id: '13',
    name: 'Titanium Fountain Pen',
    description: 'Precision-engineered titanium fountain pen with a 14k gold nib and ergonomic balance.',
    price: 185.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80',
    rating: 4.9,
    reviewsCount: 24,
    stock: 20
  },
  {
    id: '14',
    name: 'Merino Wool Cardigan',
    description: 'Fine-knit Italian merino wool cardigan with mother-of-pearl buttons.',
    price: 295.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    rating: 4.7,
    reviewsCount: 45,
    stock: 15
  },
  {
    id: '15',
    name: 'Luxe Leather Journal',
    description: 'Refillable full-grain leather journal with archival-quality cream paper.',
    price: 95.00,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
    rating: 4.8,
    reviewsCount: 67,
    stock: 40
  }
];
