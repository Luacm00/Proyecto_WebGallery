import { Hono } from "hono";
import type { AppEnv } from "../../types";
import { supabasePublico } from "../../lib/supabase";
import { validar } from "../../lib/validate";
import { AppError } from "../../middleware/errors";
import { decodeCursor, idSchema, slugSchema } from "./schemas";
import {
  getArtist,
  getArtwork,
  getCategory,
  listArtworks,
  listCategories,
} from "./repository";

export const catalogRoutes = new Hono<AppEnv>();

// Datos públicos: solo las respuestas EXITOSAS se marcan como cacheables
catalogRoutes.use("*", async (c, next) => {
  await next();
  if (c.res.ok)
    c.header("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
});

catalogRoutes.get("/categories", async (c) => {
  const items = await listCategories(supabasePublico(c.env), c.env);
  return c.json({ items });
});

catalogRoutes.get("/categories/:slug", async (c) => {
  const slug = validar(slugSchema, c.req.param("slug"));
  const categoria = await getCategory(supabasePublico(c.env), c.env, slug);
  if (!categoria)
    throw new AppError(404, "CATEGORY_NOT_FOUND", "Categoría no encontrada");
  return c.json(categoria);
});

catalogRoutes.get("/categories/:slug/artworks", async (c) => {
  const slug = validar(slugSchema, c.req.param("slug"));
  const raw = c.req.query("cursor");
  const cursor = raw ? decodeCursor(raw) : undefined;
  const pagina = await listArtworks(
    supabasePublico(c.env),
    c.env,
    { categorySlug: slug },
    cursor,
  );
  return c.json(pagina);
});

catalogRoutes.get("/artworks/:id", async (c) => {
  const id = validar(idSchema, c.req.param("id"));
  const artwork = await getArtwork(supabasePublico(c.env), c.env, id);
  if (!artwork)
    throw new AppError(404, "ARTWORK_NOT_FOUND", "Obra no encontrada");
  return c.json(artwork);
});

catalogRoutes.get("/artists/:id", async (c) => {
  const id = validar(idSchema, c.req.param("id"));
  const artist = await getArtist(supabasePublico(c.env), c.env, id);
  if (!artist)
    throw new AppError(404, "ARTIST_NOT_FOUND", "Artista no encontrado");
  return c.json(artist);
});

//   GET /artists/:id/artworks  → como /categories/:slug/artworks, pero con el filtro { artistId: id }
catalogRoutes.get("/artists/:id/artworks", async (c) => {
  const id = validar(idSchema, c.req.param("id"));
  const raw = c.req.query("cursor");
  const cursor = raw ? decodeCursor(raw) : undefined;
  const pagina = await listArtworks(
    supabasePublico(c.env),
    c.env,
    { artistId: id },
    cursor,
  );
  return c.json(pagina);
});
