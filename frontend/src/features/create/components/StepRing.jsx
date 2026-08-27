function StepRing({ step }) {
  const size = 28
  const r = 11
  const c = 2 * Math.PI * r
  const arc = step === 1 ? c * 0.65 : c
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: "rotate(-90deg)" }}
    >
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#FF6B4A" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`${arc} ${c - arc}`}
      />
    </svg>
  )
}

export default StepRing
