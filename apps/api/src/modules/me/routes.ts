import { Hono } from "hono";
import type { AppEnv } from "../../types";
import { requireAuth } from "../../middleware/auth";
import { supabaseComoUsuario } from "../../lib/supabase";
import { AppError } from "../../middleware/errors";

export const meRoutes = new Hono<AppEnv>();

meRoutes.use("*", requireAuth); // todo este módulo exige sesión

meRoutes.get("/", async (c) => {
  const user = c.get("user");
  const db = supabaseComoUsuario(c.env, user.token);

  const { data: perfil, error } = await db
    .from("profiles")
    .select(
      "id, role, status, display_name, full_name, phone_e164, city, bio, whatsapp_public",
    )
    .eq("id", user.id)
    .single(); // exactamente una fila (o error)

  if (error || !perfil) {
    throw new AppError(404, "PROFILE_NOT_FOUND", "No encontramos tu perfil");
  }

  return c.json({
    id: user.id,
    email: user.email,
    role: perfil.role,
    status: perfil.status,
    displayName: perfil.display_name,
    fullName: perfil.full_name,
    phone: perfil.phone_e164,
    city: perfil.city,
    bio: perfil.bio,
    whatsappPublic: perfil.whatsapp_public,
  });
});
