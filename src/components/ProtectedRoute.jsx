import { Navigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useUserStore();

  // Get user role from user object
  const userRole = user?.role || user?.user_role || "Cashier";

  // Check if user role is in allowed roles
  const hasAccess = allowedRoles.includes(userRole);

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
