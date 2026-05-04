import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client.
 *
 * Reads VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from env. These are public,
 * client-safe credentials — Supabase Row-Level Security policies enforce
 * authorisation, not the keys.
 *
 * In dev, set them in a local `.env` (see `.env.example`).
 * In prod, set them in Netlify → Site settings → Environment variables.
 *
 * If the env vars are missing the client is still created with empty strings;
 * any actual Supabase call will fail loudly. We don't throw at import time so
 * pages that don't need Supabase still render in dev before keys are wired up.
 */
const url = import.meta.env.VITE_SUPABASE_URL ?? "";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing — Supabase client will not work until you add them to .env (see .env.example)."
  );
}

export const supabase: SupabaseClient = createClient(url, anonKey);
