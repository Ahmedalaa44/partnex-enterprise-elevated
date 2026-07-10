import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sanityCliConfig } from "sanity/cli";

export default defineConfig({
  plugins: [react()],
  define: {
    __SANITY_CLI_CONFIG__: JSON.stringify(sanityCliConfig),
  },
});
