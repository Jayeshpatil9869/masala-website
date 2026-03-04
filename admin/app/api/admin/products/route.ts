import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  
  // Optional filters
  const categoryId = searchParams.get('category');
  const query = supabase.from('products').select('*, categories(name), product_variants(count)').order('created_at', { ascending: false });
  
  if (categoryId && categoryId !== 'all') {
    query.eq('category_id', categoryId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  // Create Product
  const { variants, ...productData } = body;
  
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  // Create Variants if they exist
  if (variants && variants.length > 0) {
    const variantsData = variants.map((v: any) => ({
      product_id: product.id,
      weight_label: v.weight_label,
      price: v.price,
      stock_quantity: v.stock_quantity
    }));

    const { error: variantError } = await supabase
      .from('product_variants')
      .insert(variantsData);

    if (variantError) {
       return NextResponse.json({ error: variantError.message, product }, { status: 201 }); // Product created, variants failed
    }
  }

  return NextResponse.json(product, { status: 201 });
}
