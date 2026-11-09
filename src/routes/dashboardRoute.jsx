import DashboardLayout from "../features/dashboard/components/DashboardLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import couponRoute from "./couponRoute";
import userProfileRoute from "./userProfileRoute";
import saleRoute from "./saleRoute";
import voucherRoute from "./VoucherRoute";
import categoryRoute from "./categoryRoute";
import supplierRoute from "./supplierRoute";
import productRoute from "./productRoute";
import purchaseRoute from "./purchase";
import customerRoute from "./customerRoute";
import levelRoute from "./levelRoute";

const dashboardRoute = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },

      ...userProfileRoute,
      ...couponRoute,
      // ...galleryRoute,
      ...saleRoute,
      ...voucherRoute,
      ...categoryRoute,
      ...supplierRoute,
      ...productRoute,
      ...purchaseRoute,
      ...customerRoute,
      ...levelRoute,
    ],
  },
];

export default dashboardRoute;
