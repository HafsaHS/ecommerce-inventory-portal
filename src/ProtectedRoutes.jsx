import { Outlet, Navigate } from "react-router";
import { useUser } from "./lib/context/user";
import { account } from "./lib/appwrite";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const { current: user, loading } = useUser();

  // Show loading state or spinner while checking authentication
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner component
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
