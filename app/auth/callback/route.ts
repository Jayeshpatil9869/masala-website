import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { recordLoginLog } from '@/lib/auth/login-log';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const eventParam = searchParams.get('event');
  const event = eventParam === 'signup' ? 'signup' : 'login';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const forwarded = request.headers.get('x-forwarded-for');
      const ip = forwarded?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip');
      const userAgent = request.headers.get('user-agent');

      await recordLoginLog(supabase, {
        user: data.user,
        event,
        method: 'google',
        ip,
        userAgent,
      });

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
