import { useEffect } from "react"

/**
 * Loads the WorldLoop brand font (Plus Jakarta Sans) once, no matter how
 * many components call this hook. Safe to use in SignIn, Register, or any
 * other WorldLoop page.
 */
export function useFonts() {
  useEffect(() => {
    const id = "worldloop-fonts"
    if (document.getElementById(id)) return
    const link = document.createElement("link")
    link.id = id
    link.rel = "stylesheet"
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
    document.head.appendChild(link)
  }, [])
}
