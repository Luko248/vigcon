import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://vigcon.eu",
  base: "/",
  integrations: [sitemap()],
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["date-fns"],
    },
  },
});
