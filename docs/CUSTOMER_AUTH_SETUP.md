# Customer Auth Setup

## 1. Apply database migration (required)

The Supabase MCP account linked in Cursor does **not** include project `oknqceysltwcahhmaygx`, and the database password is not in env — so DDL must be run once in the dashboard:

1. Open [Supabase SQL Editor](https://supabase.com/dashboard/project/oknqceysltwcahhmaygx/sql/new)
2. Paste the contents of [`supabase/migrations/20260325_customer_auth.sql`](../supabase/migrations/20260325_customer_auth.sql)
3. Run the query

This creates `profiles`, `login_logs`, the `handle_new_user` trigger, and RLS policies.

## 2. Enable Google OAuth (required for Google buttons)

1. Supabase → Authentication → Providers → **Google** → enable
2. Add Google Cloud OAuth Client ID + Secret
3. Authentication → URL Configuration:
   - Site URL: `http://localhost:3000` (prod: `https://gravitatee.com`)
   - Redirect URLs: `http://localhost:3000/auth/callback` and `https://gravitatee.com/auth/callback`

## 3. Storefront routes

- `/login` — email + Google sign-in
- `/signup` — name + email + password + Google
- `/auth/callback` — OAuth code exchange + login log

## 4. Admin

- Sidebar → **Login Logs** (`/login-logs`)
- API: `GET /api/admin/login-logs` (service role)
