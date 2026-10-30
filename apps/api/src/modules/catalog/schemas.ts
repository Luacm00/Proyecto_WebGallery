import { z } from "zod";
import { AppError } from "../../middleware/errors";

export const PAGE_SIZE = 24;

//Mismo patron que el check de la tabla categories
export const slugSchema = z
  .string()
  .max(60)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);
export const idSchema = z.guid();

const cursorSchema = z.object({
  t: z.iso.datetime({ offset: true }), // approved_at de la última obra vista
  id: idSchema,
});
export type Cursor = z.infer<typeof cursorSchema>;

// base64url: base64 sin "+", "/" ni "=", seguro dentro de una URL.
export function encodeCursor(cursor: Cursor): string {
  return btoa(JSON.stringify(cursor))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

export function decodeCursor(raw: string): Cursor {
  try {
    const json = atob(raw.replaceAll("-", "+").replaceAll("_", "/"));
    return cursorSchema.parse(JSON.parse(json));
  } catch {
    //Cualquier fallo (base64 roto, JSON roto, campos inválidos) es el mismo 400.
    throw new AppError(
      400,
      "INVALID_CURSOR",
      "El cursor de paginación no es válido",
    );
  }
}
