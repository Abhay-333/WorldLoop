import { useState } from "react"
import {
  Home,
  Search,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
} from "lucide-react"
import { Avatar } from "../../../components/ui/Avatar"

function Sidebar() {
  const [active, setActive] = useState("Home")

  const NAV_ITEMS = [
    { icon: Home, label: "Home" },
    { icon: Search, label: "Explore" },
    { icon: MessageCircle, label: "Messages" },
    { icon: Heart, label: "Notifications" },
    { icon: PlusSquare, label: "Create" },
    { icon: User, label: "Profile" },
  ]

  return (
    <aside className="fixed top-0 left-0 hidden h-screen w-64 flex-col justify-between border-r border-[#F0E9E3] bg-white px-4 py-6 md:flex">
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
                  ? "bg-[#FFF1E9] font-semibold text-[#FF3D66]"
                  : "text-[#1F1B24] hover:bg-[#FAF7F4]"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-[#FAF7F4]">
        <Avatar name="Abhay Sharma" size={32} />
        <span className="text-sm font-medium text-[#1F1B24]">abhaydev</span>
      </div>
    </aside>
  )
}

export default Sidebar
