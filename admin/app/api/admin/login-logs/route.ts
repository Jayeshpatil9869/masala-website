import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/supabase/admin';

export async function GET() {
  const { data, error } = await adminClient
    .from('login_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        hint:
          error.message.includes('schema cache') || error.code === '42P01'
            ? 'Run supabase/migrations/20260325_customer_auth.sql in the Supabase SQL Editor for project oknqceysltwcahhmaygx.'
            : undefined,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
