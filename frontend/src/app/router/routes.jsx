import { createBrowserRouter, RouterProvider } from "react-router"
import LoginPage from "@/features/auth/login/LoginPage"

const routes = [
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  //   { path: "/private", element: <PrivateRoute /> },
]
const router = createBrowserRouter(routes)
