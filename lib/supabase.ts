import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oknqceysltwcahhmaygx.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rbnFjZXlzbHR3Y2FoaG1heWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MDQ4MDMsImV4cCI6MjA4ODE4MDgwM30.1vo0Pr24u9qibWnnUVJzW1s-5GuG-KpgMTk6TtC_7JU';

  supabaseInstance = createSupabaseClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return supabaseInstance;
}

export type FormattedProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  isNew: boolean;
  isBestSeller: boolean;
  is_bestseller?: boolean;
  is_sale?: boolean;
  price: number;
  originalPrice?: number;
  category: string;
  category_id?: string;
  image_url: string;
  images: string[];
  variants: { size: string; price: number; stock?: number }[];
};

export async function fetchAllCategories() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, image_url, description')
    .order('name');

  if (error) {
    console.error('Error fetching categories from Supabase:', error);
    return [];
  }
  return data || [];
}

export async function fetchAllProducts(): Promise<FormattedProduct[]> {
  const supabase = getSupabase();
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (id, name, slug),
      product_variants (id, weight_label, price, stock_quantity)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products from Supabase:', error);
    return [];
  }

  if (!products) return [];

  return products.map((p: any) => {
    const rawVariants = p.product_variants || [];
    const prices = rawVariants.map((v: any) => Number(v.price) || 0).filter((pr: number) => pr > 0);
    const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const defaultImg = p.images?.[0] || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600';

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description || '',
      longDescription: p.long_description || '',
      isNew: false,
      isBestSeller: p.is_bestseller || false,
      is_bestseller: p.is_bestseller || false,
      is_sale: false,
      price: lowestPrice,
      originalPrice: lowestPrice > 0 ? Math.round(lowestPrice * 1.15) : undefined,
      category: p.categories?.name || p.categories?.slug || 'Pure Spices',
      category_id: p.category_id,
      image_url: defaultImg,
      images: p.images && p.images.length > 0 ? p.images : [defaultImg],
      variants: rawVariants.map((v: any) => ({
        size: v.weight_label || 'Default',
        price: Number(v.price) || 0,
        stock: v.stock_quantity || 0,
      })),
    };
  });
}

export async function fetchProductBySlug(slug: string): Promise<FormattedProduct | null> {
  const supabase = getSupabase();
  const { data: p, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (id, name, slug),
      product_variants (id, weight_label, price, stock_quantity)
    `)
    .eq('slug', slug)
    .single();

  if (error || !p) {
    console.error(`Error fetching product with slug "${slug}":`, error);
    return null;
  }

  const rawVariants = p.product_variants || [];
  const prices = rawVariants.map((v: any) => Number(v.price) || 0).filter((pr: number) => pr > 0);
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const defaultImg = p.images?.[0] || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600';

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description || '',
    longDescription: p.long_description || '',
    isNew: false,
    isBestSeller: p.is_bestseller || false,
    is_bestseller: p.is_bestseller || false,
    is_sale: false,
    price: lowestPrice,
    originalPrice: lowestPrice > 0 ? Math.round(lowestPrice * 1.15) : undefined,
    category: p.categories?.name || p.categories?.slug || 'Pure Spices',
    category_id: p.category_id,
    image_url: defaultImg,
    images: p.images && p.images.length > 0 ? p.images : [defaultImg],
    variants: rawVariants.map((v: any) => ({
      size: v.weight_label || 'Default',
      price: Number(v.price) || 0,
      stock: v.stock_quantity || 0,
    })),
  };
}
