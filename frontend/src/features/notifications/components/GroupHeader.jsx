function GroupHeader({ label }) {
  return (
    <div className="px-4 pt-5 pb-2">
      <span className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}

export default GroupHeader