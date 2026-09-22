import { NextResponse } from 'next/server';
import { fetchAllProducts } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await fetchAllProducts();
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch products' }, { status: 500 });
  }
}
