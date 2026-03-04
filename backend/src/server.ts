import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
const allowedOrigins = [
  // Production domains
  'https://gravitatee.com',
  'https://www.gravitatee.com',
  'https://admin.gravitatee.com',
  // Environment-supplied overrides (useful for staging / preview URLs)
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  // Local development
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY; // Using Anon key because these are public read operations + secure inserts

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- ROUTES ---

// 1. Healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'masala-backend' });
});

// 2. Get all products (with categories and variant summary)
app.get('/api/v1/products', async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name, slug),
        product_variants (price)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform data to match frontend expectations (adding lowest price)
    const formattedProducts = products.map(p => {
      const prices = p.product_variants.map((v: any) => v.price);
      const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
      
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        isNew: false, // Could be calculated based on created_at
        isBestSeller: p.is_bestseller || false,
        price: lowestPrice,
        category: p.categories?.slug || 'uncategorized',
        image_url: p.images?.[0] || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
        images: p.images || []
      };
    });

    res.json(formattedProducts);
  } catch (error: any) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 3. Get single product by slug
app.get('/api/v1/products/:slug', async (req, res) => {
  const { slug } = req.params;
  
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name, slug),
        product_variants (*)
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Product not found' });
      }
      throw error;
    }

    // Transform for frontend
    const prices = product.product_variants.map((v: any) => v.price);
    const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;

    const formattedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      longDescription: product.long_description,
      isNew: false,
      isBestSeller: product.is_bestseller || false,
      price: lowestPrice,
      category: product.categories?.slug || 'uncategorized',
      image_url: product.images?.[0] || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
      images: product.images || [],
      variants: product.product_variants.map((v: any) => ({
        size: v.weight_label,
        price: v.price,
        stock: v.stock_quantity
      }))
    };

    res.json(formattedProduct);
  } catch (error: any) {
    console.error(`Error fetching product ${slug}:`, error.message);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

// 4. Submit Contact Query
app.post('/api/v1/contact', async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  if (!name || !phone || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { error } = await supabase
      .from('contact_queries')
      .insert([
        { name, phone, email, subject, message, is_read: false }
      ]);

    if (error) throw error;
    
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error: any) {
    console.error('Error submitting contact query:', error.message);
    res.status(500).json({ error: 'Failed to submit message' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
