import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const CategoryCreatePage = lazy(() =>
  import("../features/category/pages/CategoryCreatePage")
);
const CategoryEditPage = lazy(() =>
  import("../features/category/pages/CategoryEditPage")
);
const CategoryListPage = lazy(() =>
  import("../features/category/pages/CategoryListPage")
);

const categoryRoute = [
  {
    path: "categorys",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <CategoryListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "categorys-create",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <CategoryCreatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "categorys-edit/:id",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Stock Manager"]}>
        <CategoryEditPage />
      </ProtectedRoute>
    ),
  },
];

export default categoryRoute;
