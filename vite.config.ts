import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    ...tanstackStart({
      server: { entry: "server" },
    }),
    nitro({
      preset: "vercel",
    }),
    tailwindcss(),
    react(),
  ],
  build: {
    target: "es2020",
    minify: "esbuild",
    cssMinify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("framer-motion")) return "framer";
          if (id.includes("@sanity/client") || id.includes("@sanity/image-url")) return "sanity";
          if (id.includes("react") || id.includes("react-dom")) return "react-vendor";
          if (id.includes("@tanstack/react-router") || id.includes("@tanstack/react-start"))
            return "router";
          if (id.includes("@tanstack/react-query")) return "query";
        },
        chunkFileNames: "chunks/[name].js",
        entryFileNames: "index.js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg|webp|avif|ico|woff|woff2|eot|ttf|otf/.test(ext)) {
            return `assets/[name][extname]`;
          }
          return `assets/[name][extname]`;
        },
      },
      external: [],
    },
    reportCompressedSize: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  ssr: {
    noExternal: ["framer-motion"],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@tanstack/react-query",
      "@tanstack/react-router",
      "framer-motion",
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
  },
});
