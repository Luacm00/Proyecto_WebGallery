import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

// Claves en un solo lugar: evita errores de tipeo y facilita invalidar después.
export const catalogKeys = {
  categories: ["catalog", "categories"],
  category: (slug) => ["catalog", "category", slug],
  categoryArtworks: (slug) => ["catalog", "category", slug, "artworks"],
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

export function useCategoryArtworks(slug) {
  return useInfiniteQuery({
    queryKey: catalogKeys.categoryArtworks(slug),
    queryFn: ({ pageParam }) => {
      const query = pageParam ? `?cursor=${encodeURIComponent(pageParam)}` : "";
      return apiFetch(
        `/catalog/categories/${encodeURIComponent(slug)}/artworks${query}`,
      );
    },
    initialPageParam: null, // la primera página va sin cursor
    getNextPageParam: (ultima) => ultima.nextCursor, // null → hasNextPage = false
  });
}
