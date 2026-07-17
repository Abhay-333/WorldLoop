// src/app/layouts/MainLayout.tsx
import { Outlet } from "react-router"
import { Home, Search, PlusSquare, Heart, MessageCircle } from "lucide-react"
import Sidebar from "../../components/custom/Sidebar"
import { Avatar } from "../../components/custom/Avatar"

// TODO: replace with real data from auth/user store
const SUGGESTIONS = [
  {
    id: "1",
    username: "priya.codes",
    subtext: "Followed by rahul_dev + 3 more",
  },
  { id: "2", username: "dev.aisha", subtext: "Suggested for you" },
  { id: "3", username: "kartik.ui", subtext: "New to WorldLoop" },
  { id: "4", username: "meera_ux", subtext: "Followed by abhaydev" },
  { id: "5", username: "rohan.stack", subtext: "Suggested for you" },
]

function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Left sidebar — fixed, collapsed w-20 → hover w-64 (desktop only) */}
      <Sidebar />

      {/* Content sits to the right of the collapsed sidebar width */}
      <div className="flex justify-center md:ml-20">
        {/* Center feed column — Instagram caps this narrow, it's never full-bleed */}
        <main className="w-full max-w-[470px] px-4 pt-6 pb-20 md:px-0 md:pb-6 lg:max-w-[630px]">
          <Outlet />
        </main>

        {/* Right suggestions rail — only appears on wide screens, like Instagram */}
        <aside className="sticky top-6 hidden h-fit w-[320px] shrink-0 pl-8 xl:block">
          <div className="mb-4 flex items-center gap-3 px-2">
            <Avatar name="Abhay Sharma" size={44} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                abhaydev
              </span>
              <span className="text-sm text-muted-foreground">
                Abhay Sharma
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Suggested for you
            </span>
            <button className="text-xs font-semibold text-foreground hover:text-muted-foreground">
              See All
            </button>
          </div>

          <ul className="mt-3 space-y-3">
            {SUGGESTIONS.map((s) => (
              <li key={s.id} className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <Avatar name={s.username} size={32} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {s.username}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {s.subtext}
                    </span>
                  </div>
                </div>
                <button className="text-xs font-semibold text-primary hover:opacity-80">
                  Follow
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Mobile bottom tab bar — replaces the sidebar under md */}
      <nav className="fixed bottom-0 left-0 flex h-14 w-full items-center justify-around border-t border-border bg-card md:hidden">
        <Home className="h-6 w-6 text-foreground" />
        <Search className="h-6 w-6 text-foreground" />
        <PlusSquare className="h-6 w-6 text-foreground" />
        <Heart className="h-6 w-6 text-foreground" />
        <MessageCircle className="h-6 w-6 text-foreground" />
      </nav>
    </div>
  )
}

export default MainLayout
