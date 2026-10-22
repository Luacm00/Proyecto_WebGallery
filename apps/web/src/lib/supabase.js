import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Falla rápido y con un mensaje claro, en vez de errores raros más adelante.
if (!url || !key) {
  throw new Error(
    "Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY. Revisa apps/web/.env.local",
  );
}

// Un solo cliente para toda la app.
export const supabase = createClient(url, key, {
  auth: {
    persistSession: true, // guarda la sesión en localStorage: sobrevive a recargar
    autoRefreshToken: true, // renueva el JWT antes de que expire
    detectSessionInUrl: true, // lee la sesión que trae el enlace del correo de confirmación
  },
});
