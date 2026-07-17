import { AVATAR_COLORS } from "../utils/componentsUtils"

function getAvatarColor(name) {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return AVATAR_COLORS[sum % AVATAR_COLORS.length]
}

function Avatar({ name, size = 44 }) {
  const initial = name?.[0]?.toUpperCase() ?? "?"
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: getAvatarColor(name),
        fontSize: size * 0.4,
      }}
    >
      {initial}
    </div>
  )
}

export { Avatar, getAvatarColor }
