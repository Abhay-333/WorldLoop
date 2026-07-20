import React from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "../../app/theme-provider"

function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="ml-2 inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm hover:bg-muted text-foreground"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  )
}

export default ThemeSwitch
