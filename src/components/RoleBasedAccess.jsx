import useUserStore from "../stores/useUserStore";

const RoleBasedAccess = ({ allowedRoles, children, fallback = null }) => {
  const { user } = useUserStore();

  // Get user role from user object
  const userRole = user?.role || user?.user_role || "Cashier"; // Default to Cashier if no role found

  // Check if user role is in allowed roles
  const hasAccess = allowedRoles.includes(userRole);

  if (!hasAccess) {
    return fallback;
  }

  return children;
};

export default RoleBasedAccess;
