import { NextResponse } from 'next/server';
import { fetchProductBySlug } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await fetchProductBySlug(slug);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch product' }, { status: 500 });
  }
}
