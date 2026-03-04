import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();

  const { variants, ...productData } = body;

  // 1. Update Product
  const { data: product, error: productError } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  // 2. Refresh Variants (Delete existing, insert new)
  // This is a simplified approach for the admin panel update
  await supabase.from('product_variants').delete().eq('product_id', id);

  if (variants && variants.length > 0) {
    const variantsData = variants.map((v: any) => ({
      product_id: id,
      weight_label: v.weight_label,
      price: v.price,
      stock_quantity: v.stock_quantity
    }));

    const { error: variantError } = await supabase
      .from('product_variants')
      .insert(variantsData);

    if (variantError) {
       return NextResponse.json({ error: variantError.message, product }, { status: 200 }); // Partial success
    }
  }

  return NextResponse.json(product);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
