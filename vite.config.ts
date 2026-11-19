import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Two copies of the Firebase core are installed; without this the database service
  // registers on one copy and the app lives on the other.
  resolve: { dedupe: ["@firebase/app", "@firebase/component"] },
});
