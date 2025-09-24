import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // boleh tukar kalau perlu
  },
  optimizeDeps: {
    exclude: [], // kalau ada lib berat nak exclude, letak sini
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
