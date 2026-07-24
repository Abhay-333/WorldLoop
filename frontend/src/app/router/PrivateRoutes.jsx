import React from "react"
import { Outlet, Navigate } from "react-router"
import useMe from "../hooks/useMe"

const PrivateRoutes = () => {
  const { data, isPending, isError } = useMe()

  if (isPending) return <div>Loading...</div>
  if (isError || !data?.success) return <Navigate to="/" replace />
  return <Outlet />
}

export default PrivateRoutes
