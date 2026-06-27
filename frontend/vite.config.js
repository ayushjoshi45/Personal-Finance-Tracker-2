import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/transaction": {
        target: "https://personal-finance-tracker-backend-k1nl.onrender.com",
        changeOrigin: true,
      },
      "/api/v1/user": {
        target: "https://personal-finance-tracker-backend-k1nl.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
