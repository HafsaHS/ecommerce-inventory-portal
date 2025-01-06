import { Navigate, Outlet } from "react-router";
import { useUser } from "./lib/context/user";

const ProtectedRoutes = () => {
  const { current: user, loading } = useUser();

  // Show loading state or spinner while checking authentication
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner component
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
