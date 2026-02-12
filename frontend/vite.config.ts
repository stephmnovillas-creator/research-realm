import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  // REMOVED: optimizeDeps (not needed for local aliases)
  resolve: {
    alias: {
      "@backend": path.resolve(__dirname, "../backend/src"),
       "@": path.resolve(__dirname, "./src"),
    },
    // preserveSymlinks is safe to keep, though often not strictly necessary with simple aliases
    preserveSymlinks: true,
  },
  // ADDED: Allow Vite to serve files from the backend folder
  server: {
    fs: {
      allow: [
        // Allow serving files from one level up to the project root
        '..', 
      ],
    },
  },
});
