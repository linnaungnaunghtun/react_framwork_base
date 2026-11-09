import SaleListPage from "../features/sale/pages/SaleListPage";
import SaleCreatePage from "../features/sale/pages/SaleCreatePage";
import SaleEditPage from "../features/sale/pages/SaleEditPage";
import SaleDetailPage from "../features/sale/pages/SaleDetailPage";
import SaleAnalysisPage from "../features/sale/pages/SaleAnalysisPage";
import ProtectedRoute from "../components/ProtectedRoute";

const saleRoute = [
  {
    path: "sales",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
        <SaleListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "sales/create",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
        <SaleCreatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "sales/:id",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
        <SaleDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "sales/:id/edit",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
        <SaleEditPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "sales/analysis",
    element: (
      <ProtectedRoute allowedRoles={["Admin"]}>
        <SaleAnalysisPage />
      </ProtectedRoute>
    ),
  },
];

export default saleRoute;
