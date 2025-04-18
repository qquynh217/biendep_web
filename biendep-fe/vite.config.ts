import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      store: path.resolve("./src/store"),
      constants: path.resolve("./src/constants"),
      components: path.resolve("./src/components"),
      hooks: path.resolve("./src/hooks"),
      context: path.resolve("./src/context"),
      pages: path.resolve("./src/pages"),
      resources: path.resolve("./src/resources"),
      services: path.resolve("./src/services"),
      utils: path.resolve("./src/utils"),
      i18n: path.resolve("./src/i18n"),
      hoc: path.resolve("./src/hoc"),
      routes: path.resolve("./src/routes"),
    },
  },
  plugins: [react()],
  build: {
    manifest: true,
    sourcemap: false,
    outDir: path.join(__dirname, "build"),
    rollupOptions: {
      // output: {
      //   manualChunks: {
      //     vendor: ['react', 'react-router-dom', 'react-dom', 'stream-browserify'],
      //     ...renderChunks(dependencies),
      //   },
      // },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
