/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslintPlugin from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

// Automatic dependency splitting
import { dependencies } from "./package.json";
const renderChunks = (deps: Record<string, string>) => {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    const ignoreList = [
      "webtorrent",
      "@fontsource/fira-code",
      "@fontsource/open-sans",
      "material-symbols",
    ];
    if (ignoreList.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
};

// Dependency Visualization
//import { visualizer } from "rollup-plugin-visualizer";
//import { type PluginOption } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin(),
    // https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html
    // https://developer.mozilla.org/docs/Web/Manifest
    // https://web.dev/add-manifest/
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "cocast.svg",
        "favicon.ico",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "apple-touch-icon.png",
        "mask-icon.svg",
      ],
      manifest: {
        name: "CoCast",
        short_name: "CoCast",
        description:
          "CoCast is a free and open-source media casting application that allows you to watch your favorite videos with friends from anywhere in the world!",
        theme_color: "#0f0f0f",
        background_color: "#0f0f0f",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    splitVendorChunkPlugin(),
    //visualizer() as PluginOption,
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setup.ts"],
  },
  esbuild: {
    drop: ["debugger"], // https://esbuild.github.io/api/#drop
    pure: ["console.debug"], // https://esbuild.github.io/api/#pure
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          ...renderChunks(dependencies),
        },
      },
    },
  },
  server: {
    // Needed for changes to picked up when running in WSL on Windows
    watch: {
      usePolling: true,
    },
  },
  base: "/cocast/", // For GitHub Pages: https://vitejs.dev/guide/static-deploy.html#github-pages
});
