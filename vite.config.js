import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/",
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      // Both locales must be build inputs: Vite rewrites the hashed asset tags
      // in every input HTML, so /fr can't drift onto a stale bundle.
      input: {
        main: path.resolve(__dirname, "index.html"),
        fr: path.resolve(__dirname, "fr/index.html"),
        components: path.resolve(__dirname, "components/index.html"),
        // Task category pages (EN + FR).
        tasksWebsite: path.resolve(__dirname, "tasks/website/index.html"),
        tasksInventory: path.resolve(__dirname, "tasks/inventory/index.html"),
        tasksSales: path.resolve(__dirname, "tasks/sales-material/index.html"),
        tachesSiteWeb: path.resolve(__dirname, "fr/taches/site-web/index.html"),
        tachesInventaire: path.resolve(__dirname, "fr/taches/inventaire/index.html"),
        tachesSupports: path.resolve(__dirname, "fr/taches/supports-de-vente/index.html"),
      },
    },
  },
});
