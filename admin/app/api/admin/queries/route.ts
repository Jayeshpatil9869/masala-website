import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/supabase/admin';

export async function GET() {
  const { data, error } = await adminClient
    .from('contact_queries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
