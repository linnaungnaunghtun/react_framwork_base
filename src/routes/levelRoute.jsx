import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const LevelCreatePage = lazy(() =>
  import("../features/level/pages/LevelCreatePage")
);
const LevelEditPage = lazy(() =>
  import("../features/level/pages/LevelEditPage")
);
const LevelListPage = lazy(() =>
  import("../features/level/pages/LevelListPage")
);

const levelRoute = [
  {
    path: "levels",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
        <LevelListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "level-create",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
        <LevelCreatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "level-edit/:id",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
        <LevelEditPage />
      </ProtectedRoute>
    ),
  },
];

export default levelRoute;
