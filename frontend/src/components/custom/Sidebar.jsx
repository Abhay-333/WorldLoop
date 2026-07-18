import { useState } from "react"
import {
  Home,
  Search,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
} from "lucide-react"
import { Avatar } from "./Avatar"
import { NAV_ITEMS } from "../utils/componentsUtils"
import ThemeSwitch from "../../features/theme/ThemeSwitch"
import { useNavigate } from "react-router"

function Sidebar() {
  const [active, setActive] = useState("Home")
  const navigate = useNavigate()

  return (
    <aside className="group fixed top-0 left-0 hidden h-screen w-20 flex-col justify-between overflow-hidden border-r border-border bg-card px-4 py-6 text-card-foreground transition-[width] duration-300 ease-in-out hover:w-64 md:flex">
      <div>
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar">
            <span className="text-sm font-extrabold text-white">W</span>
          </div>
          <span className="text-lg font-bold whitespace-nowrap text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            WorldLoop
          </span>
        </div>
        <nav className="space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, navigateTo }) => (
            <button
              key={label}
              onClick={() => {
                setActive(label)
                navigate(navigateTo)
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active === label
                  ? "bg-accent font-semibold text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-muted">
        <Avatar name="Abhay Sharma" size={32} />
        <span className="text-sm font-medium whitespace-nowrap text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          abhaydev
        </span>
        <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <ThemeSwitch />
        </span>
      </div>
    </aside>
  )
}

export default Sidebar
