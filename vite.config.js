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
        seo0: path.resolve(__dirname, "art-gallery-websites/index.html"),
        seo1: path.resolve(__dirname, "art-gallery-seo/index.html"),
        seo1Fr: path.resolve(__dirname, "fr/referencement-galerie-art/index.html"),
        seo2: path.resolve(__dirname, "art-inventory-migration/index.html"),
        seo3: path.resolve(__dirname, "art-advisor-websites/index.html"),
        editorialEn0: path.resolve(__dirname, "use-cases/index.html"),
        editorialEn1: path.resolve(__dirname, "what-we-do/index.html"),
        editorialEn2: path.resolve(__dirname, "approach/index.html"),
        editorialFr0: path.resolve(__dirname, "fr/use-cases/index.html"),
        editorialFr1: path.resolve(__dirname, "fr/what-we-do/index.html"),
        editorialFr2: path.resolve(__dirname, "fr/approach/index.html"),
        // Task category pages (EN + FR).
        contact: path.resolve(__dirname, "contact/index.html"),
        contactFr: path.resolve(__dirname, "fr/contact/index.html"),
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
