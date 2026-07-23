import { createBrowserRouter, RouterProvider } from "react-router"
import LoginPage from "@/features/auth/login/LoginPage"
import RegisterPage from "./features/auth/register/RegisterPage"
import PublicRoutes from "./app/router/PublicRoutes"
import Feed from "./features/feed/Feed"
import PrivateRoutes from "./app/router/PrivateRoutes"
import MainLayout from "./app/layouts/MainLayout"
import ExplorePage from "./features/explore/pages/ExplorePage"
import MessagesPage from "./features/messages/pages/MessagePage"
import VerifyEmailPage from "./features/auth/components/VerifyEmailPage"

const routes = [
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "verify-email/:token", element: <VerifyEmailPage /> },
    ],
  },

  {
    path: "/home",
    element: <PrivateRoutes />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          { path: "", element: <Feed /> },
          { path: "explore", element: <ExplorePage /> },
          { path: "messages", element: <MessagesPage /> },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routes)

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FCFCFC]">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
