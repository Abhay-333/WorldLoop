import { useState } from "react"

function FollowButton({ state: initialState }) {
  const [state, setState] = useState(initialState)

  if (state === "following") {
    return (
      <button
        onClick={() => setState("none")}
        className="shrink-0 rounded-lg border border-border bg-transparent px-4 py-1.5 text-[13px] font-medium text-muted-foreground"
      >
        Following
      </button>
    )
  }
  if (state === "requested") {
    return (
      <button className="shrink-0 rounded-lg border border-border bg-transparent px-4 py-1.5 text-[13px] font-medium text-muted-foreground">
        Requested
      </button>
    )
  }
  return (
    <button
      onClick={() => setState("following")}
      className="shrink-0 rounded-lg bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground"
    >
      Follow back
    </button>
  )
}

export default FollowButton
