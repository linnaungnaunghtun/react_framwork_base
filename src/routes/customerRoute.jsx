import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const CustomerCreatePage = lazy(() =>
  import("../features/customer/pages/CustomerCreatePage")
);
const CustomerEditPage = lazy(() =>
  import("../features/customer/pages/CustomerEditPage")
);
const CustomerListPage = lazy(() =>
  import("../features/customer/pages/CustomerListPage")
);
const CustomerAnalysisPage = lazy(() =>
  import("../features/customer/pages/CustomerAnalysisPage")
);

const customerRoute = [
  {
    path: "customers",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
        <CustomerListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "customer-create",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
        <CustomerCreatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "customer-edit/:id",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
        <CustomerEditPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "customers/analysis",
    element: (
      <ProtectedRoute allowedRoles={["Admin"]}>
        <CustomerAnalysisPage />
      </ProtectedRoute>
    ),
  },
];

export default customerRoute;
