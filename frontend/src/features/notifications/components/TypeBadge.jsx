import { TYPE_META } from "@/components/utils/componentsUtils"

function TypeBadge({ type }) {
  if (!type) return null
  const meta = TYPE_META[type]
  const Icon = meta.icon
  return (
    <div
      className={`absolute -right-0.5 -bottom-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full border-[1.5px] border-background ${meta.bg}`}
    >
      <Icon
        size={10}
        strokeWidth={2.5}
        className={meta.fg}
        fill={type === "like" ? "currentColor" : "none"}
      />
    </div>
  )
}

export default TypeBadge