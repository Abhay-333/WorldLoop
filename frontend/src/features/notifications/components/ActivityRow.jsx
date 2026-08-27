import { Avatar } from "radix-ui"
import TypeBadge from "./TypeBadge"
import FollowButton from "./FollowButton"

function ActivityRow({ item }) {
  const meta = TYPE_META[item.type]
  return (
    <div
      className={`flex items-center gap-3 border-b border-border px-4 py-3 transition-colors ${item.unread ? "bg-muted/50" : "bg-transparent"}`}
    >
      <div className="relative h-11 w-11 shrink-0">
        <Avatar name={item.user.name} size={44} />
        <TypeBadge type={item.type} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug text-foreground">
          <span className="font-medium">{item.user.name}</span>{" "}
          <span className="text-muted-foreground">{item.preview}</span>
        </p>
        <span className="text-xs text-muted-foreground">{item.timestamp}</span>
      </div>

      {item.type === "follow" ? (
        <FollowButton state={item.followState} />
      ) : item.postThumb ? (
        <div className="h-11 w-11 shrink-0 rounded-md bg-muted" />
      ) : null}
    </div>
  )
}

export default ActivityRow
