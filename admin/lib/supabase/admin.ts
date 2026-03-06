import { createClient } from '@supabase/supabase-js';

// Service-role client for admin API routes.
// Bypasses RLS and auth session validation — no cookie round-trips.
// NEVER expose this key to the browser.
const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export { adminClient };
