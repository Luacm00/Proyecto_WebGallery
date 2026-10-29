import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

// Claves en un solo lugar: evita errores de tipeo y facilita invalidar después.
export const catalogKeys = {
  categories: ["catalog", "categories"],
  category: (slug) => ["catalog", "category", slug],
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
