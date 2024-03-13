import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mkcert from "vite-plugin-mkcert";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mkcert(), vue()],
  server: {
    https: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
