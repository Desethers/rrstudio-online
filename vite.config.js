import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      // Both locales must be build inputs: Vite rewrites the hashed asset tags
      // in every input HTML, so /fr can't drift onto a stale bundle.
      input: {
        main: path.resolve(__dirname, "index.html"),
        fr: path.resolve(__dirname, "fr/index.html"),
      },
    },
  },
});
