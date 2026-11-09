import BreadCrumb from "../../../components/BreadCrumb";
import CouponEditForm from "../components/CouponEditForm.jsx";

const CouponEditPage = () => {
  return (
    <section>
        <BreadCrumb
          currentPageTitle={"Edit Coupon"}
          links={[{ title: "Coupon Module", path: "/dashboard/coupons" }]}
        />
        <CouponEditForm />
    </section>
  );
};

export default CouponEditPage;
