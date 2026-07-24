function Loading({ label = "Loading WorldLoop..." }) {
  return (
    <div className="nebula-bg flex min-h-screen flex-col items-center justify-center gap-6 bg-background">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
        <span className="text-2xl font-extrabold text-primary-foreground">
          W
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
      </div>

      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export default Loading
