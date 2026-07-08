import "./index.css"
import App from "./App.jsx"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster />
      <App />
    </ThemeProvider>
  </StrictMode>
)
