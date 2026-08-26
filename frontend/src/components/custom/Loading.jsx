import { useSelector } from "react-redux"

function Loading({ label = "Loading WorldLoop..." }) {
  useSelector((state) => state.theme.theme)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div
        className="w-full max-w-sm overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_20px_60px_-15px_rgba(31,27,36,0.15)]"
      >
        <div
          className="relative h-24 overflow-hidden bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-300 dark:from-pink-700 dark:via-orange-700 dark:to-yellow-600"
        />

        <div className="flex flex-col items-center px-8 py-8 text-center">
          <div
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border-4 border-card bg-primary shadow-lg"
          >
            <span className="text-2xl font-extrabold text-primary-foreground">
              W
            </span>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary/80 [animation-delay:-0.15s]" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-accent" />
          </div>

          <p className="text-base font-semibold">{label}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Just a moment while we get everything ready.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Loading
  