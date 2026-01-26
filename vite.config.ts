import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": "/src",
            "@components": "/src/components",
            "@catalyst": "/src/components/catalyst-ui-kit",
            "@api": "/src/api",
            "@lib": "/src/lib",
            "@type-defs": "/src/types",
            "@queries": "/src/queries"
        }
    }
});
