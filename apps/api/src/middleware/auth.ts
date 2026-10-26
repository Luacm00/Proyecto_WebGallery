import { createMiddleware } from "hono/factory";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { AppEnv } from "../types";
import { AppError } from "./errors";
// Las claves públicas se descargan UNA vez por instancia del Worker y se reutilizan
// (jose además las cachea y las renueva solo si Supabase las rota).
const jwksPorUrl = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function obtenerJwks(supabaseUrl: string) {
  let jwks = jwksPorUrl.get(supabaseUrl);
  if (!jwks) {
    jwks = createRemoteJWKSet(
      new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`),
    );
    jwksPorUrl.set(supabaseUrl, jwks);
  }
  return jwks;
}

/** Exige un JWT válido de Supabase en "Authorization: Bearer <token>". */
export const requireAuth = createMiddleware<AppEnv>(async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) {
    throw new AppError(401, "UNAUTHENTICATED", "Debes iniciar sesión");
  }
  const token = header.slice("Bearer ".length);

  try {
    const { payload } = await jwtVerify(
      token,
      obtenerJwks(c.env.SUPABASE_URL),
      {
        issuer: `${c.env.SUPABASE_URL}/auth/v1`,
        audience: "authenticated",
      },
    );
    c.set("user", {
      id: payload.sub!,
      email: payload.email as string | undefined,
      token,
    });
  } catch {
    // Firma inválida, vencido, otro emisor...: al cliente le da igual cuál.
    throw new AppError(401, "INVALID_TOKEN", "Tu sesión no es válida o expiró");
  }
  await next(); // FUERA del try, a propósito
});
