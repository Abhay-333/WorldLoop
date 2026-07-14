import { Avatar } from "../components/Avatar"
import { SUGGESTIONS } from "../utils/componentsUtils"

function SuggestionsPanel() {

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Avatar name="Abhay Sharma" size={44} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            abhaydev
          </p>
          <p className="truncate text-xs text-muted-foreground">Abhay Sharma</p>
        </div>
        <button className="shrink-0 text-xs font-semibold text-[#FF3D66]">
          Switch
        </button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-muted-foreground">
          Suggested for you
        </p>
        <button className="text-xs font-semibold text-foreground hover:text-muted-foreground">
          See All
        </button>
      </div>

      <div className="space-y-4">
        {SUGGESTIONS.map((s) => (
          <div key={s.username} className="flex items-center gap-3">
            <Avatar name={s.username} size={40} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {s.username}
              </p>
              <p className="truncate text-xs text-muted-foreground">{s.subtitle}</p>
            </div>
            <button className="shrink-0 text-xs font-semibold text-accent hover:text-accent">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SuggestionsPanel
