import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function DashboardProtectedRoute() {
  const { userInfo } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.adminKey);
  return <>{userInfo && isAuthenticated ? <Outlet /> : <Navigate to="/" />}</>;
}

export default DashboardProtectedRoute;
