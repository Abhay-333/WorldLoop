import { NAV_ITEMS } from "../utils/componentsUtils"
import { Home, Search, MessageCircle, Heart, PlusSquare, User } from "lucide-react"


function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-around border-t border-border bg-card py-2 text-card-foreground md:hidden">
      {NAV_ITEMS.slice(0, 5).map(({ icon: Icon, label }) => (
        <button key={label} className="p-2 text-foreground" aria-label={label}>
          <Icon className="h-6 w-6" />
        </button>
      ))}
    </nav>
  )
}

export default MobileNav