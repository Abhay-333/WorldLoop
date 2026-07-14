import { Avatar } from "../components/Avatar"

function StoryAvatar({ name, viewed }) {
  return (
    <div className="flex w-16 shrink-0 flex-col items-center gap-1.5">
      <div
        className="rounded-full p-[2.5px]"
        style={{
          background: viewed
            ? "var(--muted)"
            : "linear-gradient(135deg, #FF5C7A, #FFC24B)",
        }}
      >
        <div className="rounded-full bg-background p-[2px]">
          <Avatar name={name} size={56} />
        </div>
      </div>
      <span className="w-full truncate text-center text-[11px] text-muted-foreground">
        {name}
      </span>
    </div>
  )
}

export default StoryAvatar
