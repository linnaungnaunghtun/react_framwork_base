import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const ProductCreatePage = lazy(() =>
  import("../features/product/pages/ProductCreatePage")
);
const ProductEditPage = lazy(() =>
  import("../features/product/pages/ProductEditPage")
);
const ProductListPage = lazy(() =>
  import("../features/product/pages/ProductListPage")
);

const productRoute = [
  {
    path: "products",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <ProductListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "products-create",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <ProductCreatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "products-edit/:id",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <ProductEditPage />
      </ProtectedRoute>
    ),
  },
];

export default productRoute;
