import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/supabase/admin';

export async function GET() {
  const { data, error } = await adminClient
    .from('categories')
    .select('*, products(count)')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await adminClient
    .from('categories')
    .insert([body])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
