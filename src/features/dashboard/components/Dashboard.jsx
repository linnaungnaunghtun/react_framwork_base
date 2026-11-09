import {
  HiShoppingCart,
  HiChartBar,
  HiTag,
  HiTruck,
  HiCube,
  HiShoppingBag,
  HiUsers,
  HiStar,
  HiUser,
  HiCog,
  HiGift,
  HiDocumentText,
  HiCurrencyDollar,
  HiClipboardDocumentList,
} from "react-icons/hi2";
import useSWR from "swr";
import { productApiUrl, fetchProduct } from "../../../services/product";
import ModuleButton from "./ModuleButton";
import QuickActions from "./QuickActions";
import LowStockAlert from "../../../components/LowStockAlert";
import RoleBasedAccess from "../../../components/RoleBasedAccess";
import useUserStore from "../../../stores/useUserStore";

const Dashboard = () => {
  const { user } = useUserStore();

  // Fetch products for low stock checking
  const { data: productsData, error: productsError } = useSWR(
    `${productApiUrl}?per_page=1000`,
    fetchProduct
  );

  const products = productsData?.data || [];

  // Get user role
  const userRole = user?.role || user?.user_role || "Cashier";

  // Define modules with role-based access
  const allModules = [
    {
      title: "Point of Sale",
      description: "Sales management and analytics",
      color: "blue",
      allowedRoles: ["Admin", "Cashier"], // Both Admin and Cashier can access
      lists: [
        {
          name: "Sales",
          description: "Manage sales transactions",
          icon: <HiShoppingCart className="size-8" />,
          url: "/dashboard/sales",
          color: "blue",
          allowedRoles: ["Admin", "Cashier"],
        },
        {
          name: "Sales Analysis",
          description: "View sales analytics and reports",
          icon: <HiChartBar className="size-8" />,
          url: "/dashboard/sales/analysis",
          color: "indigo",
          allowedRoles: ["Admin"], // Only Admin can access
        },
      ],
    },
    {
      title: "Inventory Management",
      description: "Manage products, suppliers, and purchases",
      color: "green",
      allowedRoles: ["Admin", "Stock Manager"], // Admin and Stock Manager can access
      lists: [
        {
          name: "Categories",
          description: "Manage product categories",
          icon: <HiTag className="size-8" />,
          url: "/dashboard/categorys",
          color: "green",
          allowedRoles: ["Admin", "Stock Manager"],
        },
        {
          name: "Suppliers",
          description: "Manage suppliers and vendors",
          icon: <HiTruck className="size-8" />,
          url: "/dashboard/suppliers",
          color: "orange",
          allowedRoles: ["Admin", "Stock Manager"],
        },
        {
          name: "Products",
          description: "Manage product catalog",
          icon: <HiCube className="size-8" />,
          url: "/dashboard/products",
          color: "purple",
          allowedRoles: ["Admin", "Stock Manager"],
        },
        {
          name: "Purchases",
          description: "Manage purchase orders",
          icon: <HiShoppingBag className="size-8" />,
          url: "/dashboard/purchases",
          color: "teal",
          allowedRoles: ["Admin", "Stock Manager"],
        },
      ],
    },
    {
      title: "Customer Relations",
      description: "Customer and level management",
      color: "purple",
      allowedRoles: ["Admin", "Cashier"], // Admin and Cashier can access
      lists: [
        {
          name: "Customers",
          description: "Manage customer information",
          icon: <HiUsers className="size-8" />,
          url: "/dashboard/customers",
          color: "purple",
          allowedRoles: ["Admin", "Cashier"],
        },
        {
          name: "Customer Analysis",
          description: "View customer analytics and reports",
          icon: <HiChartBar className="size-8" />,
          url: "/dashboard/customers/analysis",
          color: "indigo",
          allowedRoles: ["Admin"], // Only Admin can access analysis
        },
        {
          name: "Levels",
          description: "Manage customer levels",
          icon: <HiStar className="size-8" />,
          url: "/dashboard/levels",
          color: "yellow",
          allowedRoles: ["Admin", "Cashier"],
        },
      ],
    },
    {
      title: "System & Profile",
      description: "User profile and system settings",
      color: "gray",
      allowedRoles: ["Admin", "Cashier", "Stock Manager"], // All roles can access
      lists: [
        {
          name: "Profile",
          description: "Manage your profile",
          icon: <HiUser className="size-8" />,
          url: "/dashboard/user-profile",
          color: "gray",
          allowedRoles: ["Admin", "Cashier", "Stock Manager"],
        },
      ],
    },
  ];

  // Filter modules based on user role
  const modules = allModules
    .filter((module) => module.allowedRoles.includes(userRole))
    .map((module) => ({
      ...module,
      lists: module.lists.filter((item) =>
        item.allowedRoles.includes(userRole)
      ),
    }));
  return (
    <div className="space-y-8">
      
      <LowStockAlert products={products} />
      <QuickActions />
      {modules.map((module) => (
        <div
          key={module.title}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {module.title}
            </h2>
            <p className="text-gray-600 text-sm">{module.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {module.lists.map((item, i) => (
              <ModuleButton
                key={i}
                name={item.name}
                description={item.description}
                icon={item.icon}
                url={item.url}
                color={item.color}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
