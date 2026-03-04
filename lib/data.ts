export type Category = {
  id: string;
  name: string;
  image: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description?: string;
  category: string;
  weights: string[];
  prices: Record<string, number>;
  image_url: string;
  images?: string[]; // Array for gallery
  is_bestseller: boolean;
  rating?: number;
  reviewCount?: number;
  specs?: {
    region?: string;
    harvest_date?: string;
    key_feature?: string;
    process?: string;
  };
  origin_story?: {
    text: string[];
    quote: { text: string; author: string };
  };
  sensory_profile?: {
    bitter: number;
    heat: number;
    floral: number;
    earthy: number;
    description: string;
  };
  pairs_with?: string[]; // IDs of other products
};

export type Testimonial = {
  id: string;
  name: string;
  city: string;
  rating: number;
  review: string;
  product: string;
};

export const categories: Category[] = [
  {
    id: 'blended',
    name: 'Blended Masala',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    slug: 'blended-masala',
  },
  {
    id: 'pure',
    name: 'Pure Spices',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800',
    slug: 'pure-spices',
  },
  {
    id: 'special',
    name: 'Special Blends',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    slug: 'special-blends',
  },
  {
    id: 'combo',
    name: 'Combo Packs',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800',
    slug: 'combo-packs',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Garam Masala',
    slug: 'garam-masala',
    description: 'A traditional and aromatic blend of whole spices.',
    category: 'blended-masala',
    weights: ['100g', '200g', '500g'],
    prices: { '100g': 85, '200g': 160, '500g': 380 },
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    is_bestseller: true,
  },
  {
    id: '2',
    name: 'Turmeric Powder (Haldi)',
    slug: 'turmeric-powder',
    description: 'Pure, organic turmeric with high curcumin content.',
    long_description: 'Known as the world\'s finest turmeric. Sourced directly from the Jaintia Hills of Meghalaya, boasting a curcumin content of over 7%.',
    category: 'pure-spices',
    weights: ['100g', '250g', '500g'],
    prices: { '100g': 180, '250g': 450, '500g': 850 },
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1613524622112-a7d187ed2b8d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800'
    ],
    is_bestseller: true,
    rating: 4.8,
    reviewCount: 142,
    specs: {
      region: 'Jaintia Hills, Meghalaya',
      harvest_date: 'October 2023',
      key_feature: '7.5% (High Potency)',
      process: 'Sun-dried, Stone-ground',
    },
    origin_story: {
      text: [
        'Grown by Mr. Das on his family\'s ancestral land, this turmeric is unlike anything you\'ll find in a supermarket. The unique microclimate of the Jaintia Hills allows the rhizomes to develop an extraordinarily high curcumin content.',
        'While standard turmeric hovers around 2-3%, Lakadong consistently tests above 7%. This isn\'t just a spice; it\'s a piece of history, cultivated using methods that have remained unchanged for centuries. No pesticides, no industrial processing—just pure, potent gold.'
      ],
      quote: { text: "We don't force the earth. We wait for it.", author: "MR. DAS, LEAD FARMER" }
    },
    sensory_profile: {
      bitter: 30,
      heat: 10,
      floral: 40,
      earthy: 90,
      description: 'Profile: Deeply earthy with notes of orange zest and ginger. Vibrant color intensity.'
    },
    pairs_with: ['1', '3', '4']
  },
  {
    id: '3',
    name: 'Kashmiri Red Chili Powder',
    slug: 'kashmiri-chili',
    description: 'Vibrant red color with a mild heat profile.',
    category: 'pure-spices',
    weights: ['100g', '200g', '500g'],
    prices: { '100g': 110, '200g': 210, '500g': 500 },
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    is_bestseller: true,
  },
  {
    id: '4',
    name: 'Biryani Masala',
    slug: 'biryani-masala',
    description: 'An authentic regal blend for perfect biryanis.',
    category: 'blended-masala',
    weights: ['50g', '100g', '200g'],
    prices: { '50g': 65, '100g': 120, '200g': 230 },
    image_url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800',
    is_bestseller: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    city: 'Mumbai',
    rating: 5,
    review: 'The Garam Masala is incredibly fresh. You can smell the purity as soon as you open the pack. Made my Sunday mutton curry perfect!',
    product: 'Garam Masala',
  },
  {
    id: '2',
    name: 'Rahul Verma',
    city: 'Delhi',
    rating: 5,
    review: 'Ordering on WhatsApp was so easy, and the delivery was fast. The Kashmiri chili gave a brilliant color to my dishes.',
    product: 'Kashmiri Chili Powder',
  },
  {
    id: '3',
    name: 'Anita Desai',
    city: 'Pune',
    rating: 4,
    review: 'Love the quality. It really reminds me of the freshly ground masala from my grandmother’s kitchen.',
    product: 'Biryani Masala',
  },
];
