/**
 * Apply customer auth migration using DATABASE_URL (Postgres connection string).
 *
 * Usage:
 *   set DATABASE_URL=postgresql://postgres.[REF]:[DB_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
 *   node scripts/apply-customer-auth.mjs
 *
 * Or paste supabase/migrations/20260325_customer_auth.sql into the Supabase SQL Editor.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '20260325_customer_auth.sql');
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is required. See docs/CUSTOMER_AUTH_SETUP.md');
  process.exit(1);
}

const sql = fs.readFileSync(sqlPath, 'utf8');
const client = new pg.Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
await client.query(sql);
await client.end();
console.log('Migration applied successfully.');
