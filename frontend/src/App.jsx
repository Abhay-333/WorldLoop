import { createBrowserRouter, RouterProvider } from "react-router"
import LoginPage from "@/features/auth/login/LoginPage"
import RegisterPage from "./features/auth/register/RegisterPage"
import PublicRoutes from "./app/router/PublicRoutes"
import HomeFeed from "./features/home/HomeFeed"
import PrivateRoutes from "./app/router/PrivateRoutes"
import ThemeButton from "./features/theme/ThemeButton"
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
    children: [{ path: "", element: <ThemeButton /> }],
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
