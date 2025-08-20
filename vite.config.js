import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["lucide-react", "axios"], // Add lucide-react here
    },
  },
  plugins: [tailwindcss()],
});
