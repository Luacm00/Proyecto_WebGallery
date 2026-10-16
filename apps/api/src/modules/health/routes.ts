import { Hono } from "hono";
import type { AppEnv } from "../../types";
import { AppError } from "../../middleware/errors";

export const healthRoutes = new Hono<AppEnv>();

// Lo usaran el monitoreo (UptimeRobot) y el CI para saber si la API está viva.
healthRoutes.get("/", (c) =>
  c.json({
    status: "ok",
    service: "webgallery-api",
    time: new Date().toISOString(),
  }),
);
