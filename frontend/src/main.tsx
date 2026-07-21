import "./styles/global.css"
import App from "./App"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { store } from "./app/store/store.js"
import { Providers } from "./app/providers.jsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Providers>
        <App />
        <Toaster />
      </Providers>
    </Provider>
  </StrictMode>
)
