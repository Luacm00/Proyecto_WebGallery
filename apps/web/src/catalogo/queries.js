import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

// Claves en un solo lugar: evita errores de tipeo y facilita invalidar después.
export const catalogKeys = {
  categories: ["catalog", "categories"],
  category: (slug) => ["catalog", "category", slug],
  categoryArtworks: (slug) => ["catalog", "category", slug, "artworks"],
  artwork: (id) => ["catalog", "artwork", id],
  artist: (id) => ["catalog", "artist", id],
  artistArtworks: (id) => ["catalog", "artist", id, "artworks"],
};

export function useCategories() {
  return useQuery({
    queryKey: catalogKeys.categories,
    queryFn: () => apiFetch("/catalog/categories").then((r) => r.items),
  });
}

export function useCategory(slug) {
  return useQuery({
    queryKey: catalogKeys.category(slug),
    queryFn: () => apiFetch(`/catalog/categories/${encodeURIComponent(slug)}`),
  });
}

export function useArtwork(id) {
  return useQuery({
    queryKey: catalogKeys.artwork(id),
    queryFn: () => apiFetch(`/catalog/artworks/${encodeURIComponent(id)}`),
  });
}

export function useArtist(id) {
  return useQuery({
    queryKey: catalogKeys.artist(id),
    queryFn: () => apiFetch(`/catalog/artists/${encodeURIComponent(id)}`),
  });
}

// Lista paginada de obras: cualquier endpoint que devuelva { items, nextCursor }.
function useArtworkPages(queryKey, path) {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => {
      const query = pageParam ? `?cursor=${encodeURIComponent(pageParam)}` : "";
      return apiFetch(`${path}${query}`);
    },
    initialPageParam: null,
    getNextPageParam: (ultima) => ultima.nextCursor,
  });
}

export function useCategoryArtworks(slug) {
  return useArtworkPages(
    catalogKeys.categoryArtworks(slug),
    `/catalog/categories/${encodeURIComponent(slug)}/artworks`,
  );
}

export function useArtistArtworks(id) {
  return useArtworkPages(
    catalogKeys.artistArtworks(id),
    `/catalog/artists/${encodeURIComponent(id)}/artworks`,
  );
}
