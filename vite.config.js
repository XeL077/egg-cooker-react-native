// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "react-native-svg": "react-native-svg/lib/module/ReactNativeSVG.web.js"
    },
    extensions: ['.web.js', '.web.jsx', '.js', '.jsx', '.json', '.ts', '.tsx']
  },
  optimizeDeps: {
    include: ["react-native-svg"]
  },
  define: {
    global: 'globalThis',
  }
});
