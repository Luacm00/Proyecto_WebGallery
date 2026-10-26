import { Hono } from "hono";
import type { AppEnv } from "./types";
import { requestId } from "hono/request-id";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { corsMiddleware } from "./middleware/cors";
import { healthRoutes } from "./modules/health/routes";
import { errorHandler, notFoundHandler } from "./middleware/errors";
import { meRoutes } from "./modules/me/routes";

const app = new Hono<AppEnv>();

app.use("*", requestId()); // 1. ID unico por petición (cabecera X-Request-Id)
app.use("*", logger()); // 2. log de método, ruta, estado y duración
app.use("*", secureHeaders()); // 3. cabeceras de seguridad, como en el frontend
app.use("*", corsMiddleware); // 4. permisos entre dominios

// Módulos
app.route("/health", healthRoutes);
app.route("/me", meRoutes);

// Manejo de errores
app.notFound(notFoundHandler);
app.onError(errorHandler);

export default app;
