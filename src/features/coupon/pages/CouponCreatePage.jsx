import BreadCrumb from "../../../components/BreadCrumb";
import CouponCreateForm from "../components/CouponCreateForm.jsx";

const CouponCreatePage = () => {
  return (
    <section>
        <BreadCrumb
          currentPageTitle={"Create Coupon"}
          links={[{ title: "Coupon Module", path: "/dashboard/coupons" }]}
        />
        <CouponCreateForm />
    </section>
  );
};

export default CouponCreatePage;
