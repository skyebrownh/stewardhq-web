import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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
            "@queries": "/src/queries"
        }
    }
});
