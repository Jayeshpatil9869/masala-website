import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oknqceysltwcahhmaygx.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rbnFjZXlzbHR3Y2FoaG1heWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MDQ4MDMsImV4cCI6MjA4ODE4MDgwM30.1vo0Pr24u9qibWnnUVJzW1s-5GuG-KpgMTk6TtC_7JU';

export function createClient() {
  if (client) return client;
  client = createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
  return client;
}
