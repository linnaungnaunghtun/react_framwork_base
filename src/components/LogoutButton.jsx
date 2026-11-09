import { useNavigate } from "react-router-dom";
import { removeCookie } from "react-use-cookie";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie("my_token");
    removeCookie("user");
    navigate("/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-500 dark:focus:ring-primary-800"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
