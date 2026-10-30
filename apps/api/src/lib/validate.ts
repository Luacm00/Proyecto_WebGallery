import type { z } from "zod";
import { AppError } from "../middleware/errors";

/** Valida un dato del cliente; si no cumple el esquema, responde 400 sin tocar la base. */
export function validar<T>(schema: z.ZodType<T>, valor: unknown): T {
  const r = schema.safeParse(valor);
  if (!r.success)
    throw new AppError(400, "INVALID_PARAMS", "Parámetros inválidos");
  return r.data;
}
