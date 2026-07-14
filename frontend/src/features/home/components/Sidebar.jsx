import { useState } from "react"
import {
  Home,
  Search,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
} from "lucide-react"
import { Avatar } from "../components/Avatar"
import { NAV_ITEMS } from "../utils/componentsUtils"

function Sidebar() {
  const [active, setActive] = useState("Home")

  return (
    <aside className="fixed top-0 left-0 hidden h-screen w-64 flex-col justify-between border-r border-border bg-card px-4 py-6 text-card-foreground md:flex">
      <div>
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1F1B24]">
            <span className="text-sm font-extrabold text-white">W</span>
          </div>
          <span className="text-lg font-bold text-[#1F1B24]">WorldLoop</span>
        </div>
        <nav className="space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active === label
                  ? "bg-accent font-semibold text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-muted">
        <Avatar name="Abhay Sharma" size={32} />
        <span className="text-sm font-medium text-[#1F1B24]">abhaydev</span>
      </div>
    </aside>
  )
}

export default Sidebar
