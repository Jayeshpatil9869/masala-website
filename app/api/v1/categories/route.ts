import { NextResponse } from 'next/server';
import { fetchAllCategories } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await fetchAllCategories();
    return NextResponse.json(categories);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch categories' }, { status: 500 });
  }
}
