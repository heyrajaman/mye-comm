import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // 1. Check if logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if role is admin
  // (We assume your user object has a 'role' property)
  if (user?.role !== "admin") {
    // If they are a customer trying to access admin pages, kick them out
    return <Navigate to="/" replace />;
  }

  // 3. If passed both checks, let them in
  return <Outlet />;
};

export default AdminRoute;
