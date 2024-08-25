import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.adminKey);
  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/" />}</>;
}

export default AdminProtectedRoute;
