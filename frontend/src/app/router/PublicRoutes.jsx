import React from "react"
import { Outlet, Navigate } from "react-router"
import useMe from "../hooks/useMe"
import Loading from "@/components/custom/Loading"
const PublicRoutes = () => {
  const { data, isPending, isError } = useMe()
  if (isPending) return <Loading></Loading>
  if (data?.success) return <Navigate to="/home"></Navigate>
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default PublicRoutes
