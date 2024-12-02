import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000, // Use the PORT environment variable or default to 3000
    },
});

