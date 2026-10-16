import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // JSX, Fast Refresh (recarga sin perder estado)
  server: { port: 3000 },
  build: { sourcemap: false },
});
