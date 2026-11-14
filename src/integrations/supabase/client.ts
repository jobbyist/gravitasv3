import { createClient } from "@supabase/supabase-js";

import type { Database } from "./types";

/**
 * Browser-safe Supabase client.
 *
 * The URL and publishable key are public by design: Row Level Security, not the
 * key, protects the data. Environment variables override the defaults so preview
 * and production can point at different projects. Never put the service-role key
 * in a VITE_* variable: anything prefixed VITE_ ships to the browser.
 */
const DEFAULT_URL = "https://klspzhpjungzenghwocl.supabase.co";
const DEFAULT_PUBLISHABLE_KEY = "sb_publishable_Xq5Ll3Or3vmhp0sME0S0Tg_New-r2wu";

const env = import.meta.env as Record<string, string | undefined>;

export const SUPABASE_URL = env["VITE_SUPABASE_URL"] || DEFAULT_URL;
export const SUPABASE_PUBLISHABLE_KEY =
  env["VITE_SUPABASE_PUBLISHABLE_KEY"] || env["VITE_SUPABASE_ANON_KEY"] || DEFAULT_PUBLISHABLE_KEY;

const isBrowser = typeof window !== "undefined";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    flowType: "pkce",
    // Sessions live in the browser only. Server-side renders are always anonymous.
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    detectSessionInUrl: isBrowser,
  },
});
