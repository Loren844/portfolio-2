import { defineConfig } from "vite";

// Chemins relatifs : le site fonctionne aussi bien à la racine d'un domaine
// que dans un sous-dossier (GitHub Pages : /portfolio-2/).
export default defineConfig({
  base: "./",
  build: { target: "es2020", chunkSizeWarningLimit: 900 },
});
