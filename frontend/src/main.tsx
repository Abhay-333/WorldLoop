import "./styles/global.css"
import App from "./App"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "./app/theme-provider"
import { Provider } from "react-redux"
import { store } from "./app/store/store"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Toaster />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
