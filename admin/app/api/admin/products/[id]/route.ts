import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/supabase/admin';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { variants, ...productData } = body;

  // 1. Update product
  const { data: product, error: productError } = await adminClient
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  // 2. Delete old variants & prepare new data in parallel
  const variantsData = (variants ?? []).map((v: any) => ({
    product_id: id,
    weight_label: v.weight_label,
    price: v.price,
    stock_quantity: v.stock_quantity,
  }));

  // Delete existing variants (fire immediately after product update)
  await adminClient.from('product_variants').delete().eq('product_id', id);

  // 3. Insert new variants (if any)
  if (variantsData.length > 0) {
    const { error: variantError } = await adminClient
      .from('product_variants')
      .insert(variantsData);

    if (variantError) {
      return NextResponse.json({ error: variantError.message, product }, { status: 200 });
    }
  }

  return NextResponse.json(product);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { error } = await adminClient
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
