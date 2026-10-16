// Error "esperado" de negocio: los módulos lanzan esto, p. ej.

import type { ErrorHandler, NotFoundHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { AppEnv } from "../types";
import { HTTPException } from "hono/http-exception";

// throw new AppError(403, "ARTIST_NOT_APPROVED", "Tu perfil aún no está aprobado")
export class AppError extends Error {
  constructor(
    public readonly status: ContentfulStatusCode,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler: ErrorHandler<AppEnv> = (err, c) => {
  const requestId = c.get("requestId");

  if (err instanceof AppError) {
    return c.json(
      { error: { code: err.code, message: err.message, requestId } },
      err.status,
    );
  }
  if (err instanceof HTTPException) {
    return c.json(
      { error: { code: "HTTP_ERROR", message: err.message, requestId } },
      err.status,
    );
  }

  //Error inesperado: el detalle va al log, al cliente solo un mensaje genérico.
  console.error({ requestId, message: err.message, stack: err.stack });
  return c.json(
    {
      error: {
        code: "INTERNAL_ERROR",
        message: "Error interno del servidor",
        requestId,
      },
    },
    500,
  );
};

export const notFoundHandler: NotFoundHandler<AppEnv> = (c) =>
  c.json(
    {
      error: {
        code: "NOT_FOUND",
        message: `Ruta no encontrada: ${c.req.path}`,
        requestId: c.get("requestId"),
      },
    },
    404,
  );
