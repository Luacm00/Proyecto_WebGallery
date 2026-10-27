import { createClient } from "@supabase/supabase-js";
/**
 * Cliente que actúa COMO el usuario: reenvía su JWT, así que Postgres aplica RLS.
 * Se crea uno por petición (cada petición puede ser de un usuario distinto).
 */
export function supabaseComoUsuario(env: Env, token: string) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false }, // en el servidor no hay sesión que guardar
  });
}
