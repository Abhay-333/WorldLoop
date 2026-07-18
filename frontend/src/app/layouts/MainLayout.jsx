import { Outlet, useLocation } from "react-router"
import Sidebar from "../../components/custom/Sidebar"
import { Avatar } from "../../components/custom/Avatar"
import MobileNav from "../../components/custom/MobileNav"
import SuggestionsPanel from "@/components/custom/SuggestionsPanel"

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
  const { pathname } = useLocation()
  const isMessagesPage = pathname === "/home/messages"

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Sidebar />

      <div className="min-h-screen md:pl-20">
        {isMessagesPage ? (
          <main className="w-full">
            <Outlet />
          </main>
        ) : (
          <div className="mx-auto flex w-full max-w-[1120px] justify-center px-4 md:px-8 xl:justify-start xl:gap-10">
            <main className="w-full max-w-[630px] pt-6 pb-20 md:pb-8">
              <Outlet />
            </main>

          </div>
        )}
      </div>

      <MobileNav />
    </div>
  )
}

export default MainLayout
