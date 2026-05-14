import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE?.trim() || "./";

  return {
  plugins: [react()],
  base,
  server: {
    // Allow dev server through ngrok (Host header is *.ngrok-free.app, etc.)
    allowedHosts: [".ngrok-free.app", ".ngrok-free.dev", ".ngrok.io", ".ngrok.app"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "react-fast-marquee",
      "framer-motion",
      "sonner",
      "@radix-ui/react-select",
      "@radix-ui/react-label",
    ],
  },
  };
});