import type { RequestIdVariables } from "hono/request-id";

// Lo que el middleware de autenticación deja disponible en c.get("user").
export type AuthUser = {
  id: string; // "sub" del JWT = id en auth.users y en profiles
  email: string | undefined;
  token: string; // el JWT original, para reenviarlo a Supabase (RLS)
};

// Bindings  = lo que Cloudflare inyecta (variables, secretos, R2...)
// Variables = lo que los middlewares guardan durante la petición (c.set / c.get)
export type AppEnv = {
  Bindings: Env;
  Variables: RequestIdVariables & { user: AuthUser };
};
