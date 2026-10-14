import type { MiddlewareHandler } from "hono";
import type { AppEnv } from "../types";
import { cors } from "hono/cors";

// Previews de Cloudflare Pages: https://<hash-o-rama>.webgallery-2bc.pages.dev
const PREVIEW_ORIGIN = /^https:\/\/[a-z0-9-]+\.webgallery-2bc\.pages\.dev$/;

export const corsMiddleware: MiddlewareHandler<AppEnv> = (c, next) => {
  const allowed = c.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());

  return cors({
    // Devolver el origen = permitido. Devolver null = el navegador bloquea.
    origin: (origin) =>
      allowed.includes(origin) || PREVIEW_ORIGIN.test(origin) ? origin : null,
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
    allowHeaders: ["Authorization", "Content-Type"],
    maxAge: 600, // el navegador recuerda el permiso 10 min (menos peticiones previas)
  })(c, next);
};
