import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ThemeProvider } from "./theme-provider.js"
import { queryClient } from "./query-client.js"
import { env } from "../config/env.js"

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ThemeProvider storageKey="worldloop-ui-theme">
          {children}
        </ThemeProvider>
      </GoogleOAuthProvider>
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      )}
    </QueryClientProvider>
  )
}
