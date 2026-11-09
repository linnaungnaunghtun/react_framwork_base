import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const SupplierCreatePage = lazy(() =>
  import("../features/supplier/pages/SupplierCreatePage")
);
const SupplierEditPage = lazy(() =>
  import("../features/supplier/pages/SupplierEditPage")
);
const SupplierListPage = lazy(() =>
  import("../features/supplier/pages/SupplierListPage")
);

const supplierRoute = [
  {
    path: "suppliers",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <SupplierListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "suppliers-create",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <SupplierCreatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "suppliers-edit/:id",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <SupplierEditPage />
      </ProtectedRoute>
    ),
  },
];

export default supplierRoute;
