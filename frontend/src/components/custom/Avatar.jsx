import { useState } from "react"
import { AVATAR_COLORS } from "../utils/componentsUtils"

function getAvatarColor(name) {
  const sum = [...(name ?? "")].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return AVATAR_COLORS[sum % AVATAR_COLORS.length]
}

/**
 * Avatar
 * - No `src` (or image fails to load): falls back to the original
 *   initials-on-solid-color look, unchanged from before.
 * - `src` provided and loads fine: renders the image instead.
 * - `className` merges onto the wrapping circle, so callers can add
 *   things like `border-2 border-background` for a ring effect.
 *
 * Existing call sites that only pass `name` and `size` keep working
 * exactly as they did.
 */

function Avatar({ name, src, size = 44, className = "" }) {
  const [imageFailed, setImageFailed] = useState(false)
  const initial = name?.[0]?.toUpperCase() ?? "?"
  const showImage = Boolean(src) && !imageFailed

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold text-white ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: showImage ? undefined : getAvatarColor(name),
        fontSize: size * 0.4,
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        initial
      )}
    </div>
  )
}

export { Avatar, getAvatarColor }