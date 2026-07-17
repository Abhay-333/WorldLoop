import { Outlet } from "react-router"
import Sidebar from "../../components/custom/Sidebar"
import { Avatar } from "../../components/custom/Avatar"
import MobileNav from "../../components/custom/MobileNav"

const SUGGESTIONS = [
  { id: "1", username: "priya.codes", subtext: "Followed by rahul_dev + 3 more" },
  { id: "2", username: "dev.aisha", subtext: "Suggested for you" },
  { id: "3", username: "kartik.ui", subtext: "New to WorldLoop" },
  { id: "4", username: "meera_ux", subtext: "Followed by abhaydev" },
  { id: "5", username: "rohan.stack", subtext: "Suggested for you" },
]

function MainLayout() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Sidebar />

      <div className="min-h-screen md:pl-20">
        <div className="mx-auto flex w-full max-w-[1120px] justify-center px-4 md:px-8 xl:justify-start xl:gap-10">
          <main className="w-full max-w-[630px] pt-6 pb-20 md:pb-8">
            <Outlet />
          </main>

          <aside className="sticky top-6 hidden h-fit w-[320px] shrink-0 py-6 xl:block">
            <div className="mb-4 flex items-center gap-3 px-2">
              <Avatar name="Abhay Sharma" size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">abhaydev</p>
                <p className="truncate text-sm text-muted-foreground">Abhay Sharma</p>
              </div>
              <button type="button" className="text-xs font-semibold text-primary hover:opacity-80">
                Switch
              </button>
            </div>

            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-semibold text-muted-foreground">Suggested for you</span>
              <button type="button" className="text-xs font-semibold hover:text-muted-foreground">
                See All
              </button>
            </div>

            <ul className="mt-3 space-y-3">
              {SUGGESTIONS.map((suggestion) => (
                <li key={suggestion.id} className="flex items-center justify-between gap-3 px-2">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar name={suggestion.username} size={32} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{suggestion.username}</p>
                      <p className="truncate text-xs text-muted-foreground">{suggestion.subtext}</p>
                    </div>
                  </div>
                  <button type="button" className="shrink-0 text-xs font-semibold text-primary hover:opacity-80">
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}

export default MainLayout
