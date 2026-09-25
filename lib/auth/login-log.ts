import type { SupabaseClient, User } from '@supabase/supabase-js';

export type AuthMethod = 'email' | 'google';
export type AuthEvent = 'signup' | 'login' | 'logout';

export async function recordLoginLog(
  supabase: SupabaseClient,
  opts: {
    user: User;
    event: AuthEvent;
    method: AuthMethod;
    ip?: string | null;
    userAgent?: string | null;
  }
) {
  const fullName =
    (opts.user.user_metadata?.full_name as string | undefined) ||
    (opts.user.user_metadata?.name as string | undefined) ||
    '';

  const { error } = await supabase.from('login_logs').insert({
    user_id: opts.user.id,
    email: opts.user.email ?? '',
    full_name: fullName,
    event: opts.event,
    method: opts.method,
    ip: opts.ip ?? null,
    user_agent: opts.userAgent ?? null,
  });

  if (error) {
    console.error('Failed to record login log:', error.message);
  }
}
