import { Link } from "react-router-dom";
import {
  HiPlus,
  HiShoppingCart,
  HiCube,
  HiUsers,
  HiChartBar,
} from "react-icons/hi2";
import useUserStore from "../../../stores/useUserStore";

const QuickActions = () => {
  const { user } = useUserStore();
  const userRole = user?.role || user?.user_role || "Cashier";

  const allActions = [
    {
      name: "New Sale",
      description: "Start a new sale transaction",
      icon: <HiShoppingCart className="size-6" />,
      url: "/dashboard/sales/create",
      color: "green",
      allowedRoles: ["Admin", "Cashier"],
    },
    {
      name: "Add Product",
      description: "Add a new product to inventory",
      icon: <HiCube className="size-6" />,
      url: "/dashboard/products-create",
      color: "blue",
      allowedRoles: ["Admin", "Stock Manager"],
    },
    {
      name: "New Customer",
      description: "Register a new customer",
      icon: <HiUsers className="size-6" />,
      url: "/dashboard/customer-create",
      color: "purple",
      allowedRoles: ["Admin", "Cashier"],
    },
    {
      name: "View Reports",
      description: "Check sales analytics",
      icon: <HiChartBar className="size-6" />,
      url: "/dashboard/sales/analysis",
      color: "indigo",
      allowedRoles: ["Admin"],
    },
  ];

  // Filter actions based on user role
  const actions = allActions.filter((action) =>
    action.allowedRoles.includes(userRole)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-gray-600 text-sm">Common tasks to get you started</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.url}
            className={`group p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md hover:scale-105 ${
              action.color === "green"
                ? "bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                : action.color === "blue"
                ? "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                : action.color === "purple"
                ? "bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700"
                : "bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg bg-white shadow-sm ${
                  action.color === "green"
                    ? "text-green-600"
                    : action.color === "blue"
                    ? "text-blue-600"
                    : action.color === "purple"
                    ? "text-purple-600"
                    : "text-indigo-600"
                }`}
              >
                {action.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{action.name}</h3>
                <p className="text-xs opacity-75">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
