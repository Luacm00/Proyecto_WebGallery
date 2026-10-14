import type { RequestIdVariables } from "hono/request-id";

// Bindings  = lo que Cloudflare inyecta (variables, secretos, R2...)
// Variables = lo que los middlewares guardan durante la petición (c.set / c.get)
export type AppEnv = {
  Bindings: Env;
  Variables: RequestIdVariables;
};
