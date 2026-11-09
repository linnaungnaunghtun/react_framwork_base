import { lazy } from "react";

const CouponCreatePage = lazy(() =>
  import("../features/coupon/pages/CouponCreatePage")
);
const CouponEditPage = lazy(() =>
  import("../features/coupon/pages/CouponEditPage")
);
const CouponListPage = lazy(() =>
  import("../features/coupon/pages/CouponListPage")
);

const couponRoute = [
  {
    path: "coupons",
    element: <CouponListPage />,
  },
  {
    path: "coupons-create",
    element: <CouponCreatePage />,
  },
  {
    path: "coupons-edit/:id",
    element: <CouponEditPage />,
  },
];

export default couponRoute;
