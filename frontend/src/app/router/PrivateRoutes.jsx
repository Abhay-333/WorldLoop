import React from "react"
import { Outlet, Navigate } from "react-router"
import useMe from "../hooks/useMe"
import Loading from "@/components/custom/Loading"

const PrivateRoutes = () => {
  const { data, isPending, isError } = useMe()

  if (isPending) return <Loading />
  if (isError || !data?.success) return <Navigate to="/" replace />
  return <Outlet />
}

export default PrivateRoutes
