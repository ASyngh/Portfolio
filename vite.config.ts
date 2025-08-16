import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    // Only use dev plugins locally
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID
        ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
              m.cartographer()
          ),
        ]
        : []),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "client", "src"),
      "@shared": resolve(__dirname, "shared"),
      "@assets": resolve(__dirname, "client", "public", "assets"),
    },
  },
  root: resolve(__dirname, "client"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
