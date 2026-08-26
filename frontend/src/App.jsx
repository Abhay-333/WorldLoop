import { createBrowserRouter, RouterProvider } from "react-router"
import LoginPage from "@/features/auth/pages/login/LoginPage"
import RegisterPage from "./features/auth/pages/register/RegisterPage"
import PublicRoutes from "./app/router/PublicRoutes"
import Feed from "./features/feed/Feed"
import PrivateRoutes from "./app/router/PrivateRoutes"
import MainLayout from "./app/layouts/MainLayout"
import ExplorePage from "./features/explore/pages/ExplorePage"
import MessagesPage from "./features/messages/pages/MessagePage"
import VerifyEmailPage from "./features/auth/pages/VerifyEmailPage"
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage"
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage"
import ProfilePage from "./features/profile/pages/ProfilePage"

/**
 * Client route tree.
 *
 * Public routes redirect signed-in users to the app. Routes nested under
 * `/home` require a successful authenticated-user lookup before rendering
 * the shared application layout.
 */
const routes = [
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "verify-email", element: <VerifyEmailPage /> },
      { path: "verify-email/:token", element: <VerifyEmailPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password/:token", element: <ResetPasswordPage /> },
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
          { path: "profile", element: <ProfilePage /> },
          { path: "profile/:username", element: <ProfilePage /> },
        ],
      },
    ],
  },
]

/** Creates the browser router once so route state is retained across renders. */
const router = createBrowserRouter(routes)

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FCFCFC]">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
