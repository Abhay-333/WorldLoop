function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-primary-foreground transition-all ${checked ? "left-4.5" : "left-0.5"}`}
      />
    </button>
  )
}

export default Toggle;