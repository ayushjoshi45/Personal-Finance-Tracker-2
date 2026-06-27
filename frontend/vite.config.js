import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const API_URL = "https://personal-finance-tracker-2-mx43.onrender.com";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/transaction": {
        target: API_URL,
        changeOrigin: true,
      },
      "/api/v1/user": {
        target: API_URL,
        changeOrigin: true,
      },
    },
  },
});
