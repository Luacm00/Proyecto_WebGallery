import type { SupabaseClient } from "@supabase/supabase-js";
import { mediaUrl } from "../../lib/media";
import { PAGE_SIZE, encodeCursor, type Cursor } from "./schemas";

type ArtworkRow = {
  id: string;
  title: string;
  description: string | null;
  year: number | null;
  dimensions: string | null;
  image_key: string;
  width: number | null;
  height: number | null;
  dominant_color: string | null;
  approved_at: string;
  category_slug: string;
  category_name: string;
  artist_id: string;
  artist_name: string;
  artist_city: string | null;
  artist_whatsapp: string | null;
};

const ARTWORK_COLUMNS =
  "id, title, description, year, dimensions, image_key, width, height, dominant_color, approved_at, " +
  "category_slug, category_name, artist_id, artist_name, artist_city, artist_whatsapp";

// snake_case de la base -> camelCase de la API (igual que en /me), y la clave -> URL
function toArtwork(env: Env, r: ArtworkRow) {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    year: r.year,
    dimensions: r.description,
    imageUrl: mediaUrl(env, r.image_key),
    width: r.width,
    height: r.height,
    dominantColor: r.dominant_color,
    approvedAt: r.approved_at,
    category: { slug: r.category_slug, name: r.category_name },
    artist: {
      id: r.artist_id,
      name: r.artist_name,
      city: r.artist_city,
      whatsapp: r.artist_whatsapp,
    },
  };
}

function fallo(contexto: string, message: string): never {
  /// Error inesperado → 500 genérico; el detalle queda en el log (errorHandler).
  throw new Error(`catalog.${contexto}: ${message}`);
}

export async function listCategories(db: SupabaseClient, env: Env) {
  const { data, error } = await db
    .from("categories") // RLS ya filtra: anon solo ve las activas
    .select("slug, name, description, how_to, materials, cover_key")
    .order("sort_order");

  if (error) fallo("listCategories", error.message);
  return data.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    howTo: c.how_to,
    materials: c.materials,
    coverUrl: mediaUrl(env, c.cover_key),
  }));
}

export async function getCategory(db: SupabaseClient, env: Env, slug: string) {
  const { data, error } = await db
    .from("categories")
    .select("slug, name, description, how_to, materials, cover_key")
    .eq("slug", slug)
    .maybeSingle(); // 0 filas → data = null (no es error); 2+ filas → error
  if (error) fallo("getCategory", error.message);
  if (!data) return null;
  return {
    slug: data.slug,
    name: data.name,
    description: data.description,
    howTo: data.how_to,
    materials: data.materials,
    coverUrl: mediaUrl(env, data.cover_key),
  };
}

/** Una página de obras (más recientes primero), filtrada por categoría o por artista. */
export async function listArtworks(
  db: SupabaseClient,
  env: Env,
  filtro: { categorySlug?: string; artistId?: string },
  cursor?: Cursor,
) {
  let q = db
    .from("public_artworks")
    .select(ARTWORK_COLUMNS)
    .order("approved_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(PAGE_SIZE + 1); // una de más: si llega, hay otra página

  if (filtro.categorySlug) q = q.eq("category_slug", filtro.categorySlug);
  if (filtro.artistId) q = q.eq("artist_id", filtro.artistId);
  if (cursor) {
    // "más antiguas que la ultima vista", con el id como desempate
    q = q.or(
      `approved_at.lt."${cursor}",and(approved_at.eq."${cursor.t}",id.lt.${cursor.id})`,
    );
  }

  const { data, error } = await q;
  if (error) fallo("listArtworks", error.message);

  const filas = data as unknown as ArtworkRow[];
  const hayMas = filas.length > PAGE_SIZE;
  const pagina = hayMas ? filas.slice(0, PAGE_SIZE) : filas;
  const ultima = pagina.at(-1);

  return {
    items: pagina.map((r) => toArtwork(env, r)),
    nextCursor:
      hayMas && ultima
        ? encodeCursor({ t: ultima.approved_at, id: ultima.id })
        : null,
  };
}

export async function getArtwork(db: SupabaseClient, env: Env, id: string) {
  const { data, error } = await db
    .from("public_artworks")
    .select(ARTWORK_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) fallo("getArtwork", error.message);
  return data ? toArtwork(env, data as unknown as ArtworkRow) : null;
}

export async function getArtist(db: SupabaseClient, env: Env, id: string) {
  const { data, error } = await db
    .from("public_artist")
    .select("id, display_name, city, bio, avatar_key, whatsapp")
    .eq("id", id)
    .maybeSingle();
  if (error) fallo("getArtist", error.message);
  if (!data) return null;
  return {
    id: data.id,
    name: data.display_name,
    city: data.city,
    bio: data.bio,
    avatarUrl: mediaUrl(env, data.avatar_key),
    whatsapp: data.whatsapp,
  };
}
