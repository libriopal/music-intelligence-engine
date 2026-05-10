import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import crossOriginIsolation from "vite-plugin-cross-origin-isolation";

export default defineConfig({
  plugins: [react(), crossOriginIsolation()],
  worker: {
    // 1. Set the output format to 'es'
    format: 'es', 
    
    // 2. Apply plugins to the worker bundle for production builds
    plugins: () => [react(), crossOriginIsolation()]
  }
});

