import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api/v1": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  }
})
