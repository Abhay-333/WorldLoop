import { createBrowserRouter, RouterProvider } from "react-router"
import LoginPage from "@/features/auth/login/LoginPage"
import RegisterPage from "./features/auth/register/RegisterPage"
import PublicRoutes from "./app/router/PublicRoutes"
import Feed from "./features/feed/Feed"
import PrivateRoutes from "./app/router/PrivateRoutes"
import MainLayout from "./app/layouts/MainLayout"

const routes = [
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },

  {
    path: "/home",
    element: <PrivateRoutes />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [{ path: "", element: <Feed /> }],
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
