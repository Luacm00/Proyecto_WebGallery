/**
 * Convierte la clave guardada en la base (p. ej. "ana/oleo1.jpg") en una URL pública.
 * Cambiar de proveedor (carpeta local, R2, Storage) = cambiar MEDIA_BASE_URL, no el código.
 */
export function mediaUrl(env: Env, key: string | null): string | null {
  if (!key) return null;
  const ruta = key.split("/").map(encodeURIComponent).join("/");
  return `${env.MEDIA_BASE_URL}/${ruta}`;
}
