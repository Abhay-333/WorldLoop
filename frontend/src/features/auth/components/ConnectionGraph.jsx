/** Same floating connection graph as the sign-in banner. */
export default function ConnectionGraph() {
  const nodes = [
    { cx: 40, cy: 40, r: 10, dur: 3.2, delay: 0 },
    { cx: 120, cy: 74, r: 6, dur: 3.8, delay: 0.6 },
    { cx: 205, cy: 28, r: 8, dur: 3.4, delay: 1.1 },
    { cx: 262, cy: 82, r: 5, dur: 4.2, delay: 0.3 },
    { cx: 322, cy: 46, r: 9, dur: 3.6, delay: 0.9 },
    { cx: 90, cy: 104, r: 5, dur: 4, delay: 1.4 },
  ]

  return (
    <div className="absolute inset-0">
      <style>{`
        @keyframes worldloop-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      <svg
        viewBox="0 0 360 140"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <g stroke="rgba(255,255,255,0.45)" strokeWidth="1">
          <line x1="40" y1="40" x2="120" y2="74" />
          <line x1="120" y1="74" x2="205" y2="28" />
          <line x1="205" y1="28" x2="262" y2="82" />
          <line x1="262" y1="82" x2="322" y2="46" />
          <line x1="90" y1="104" x2="120" y2="74" />
          <line x1="90" y1="104" x2="40" y2="40" />
        </g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="rgba(255,255,255,0.92)"
            style={{
              animation: `worldloop-float ${n.dur}s ease-in-out infinite`,
              animationDelay: `${n.delay}s`,
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          />
        ))}
      </svg>
    </div>
  )
}
