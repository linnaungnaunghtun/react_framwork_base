import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const PurchaseCreatePage = lazy(() =>
  import("../features/purchase/pages/PurchaseCreatePage")
);
const PurchaseEditPage = lazy(() =>
  import("../features/purchase/pages/PurchaseEditPage")
);
const PurchaseListPage = lazy(() =>
  import("../features/purchase/pages/PurchaseListPage")
);
const PurchaseDetailPage = lazy(() =>
  import("../features/purchase/pages/PurchaseDetailPage")
);

const purchaseRoute = [
  {
    path: "purchases",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <PurchaseListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "purchases-create",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <PurchaseCreatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "purchases-edit/:id",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <PurchaseEditPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "purchases-preview/:id",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <PurchaseDetailPage />
      </ProtectedRoute>
    ),
  },
];

export default purchaseRoute;
