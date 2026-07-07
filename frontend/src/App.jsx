import { createBrowserRouter, RouterProvider } from "react-router"
import LoginPage from "@/features/auth/login/LoginPage"
import RegisterPage from "./features/auth/register/RegisterPage"
import PublicRoutes from "./app/router/PublicRoutes"

const routes = [
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      { path: "/", index: true, element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  //   { path: "/private", element: <PrivateRoute /> },
]

const router = createBrowserRouter(routes)

function App() {
  return <div className="flex items-center justify-center min-h-screen bg-[#FCFCFC]"><RouterProvider router={router} /></div>
}

export default App