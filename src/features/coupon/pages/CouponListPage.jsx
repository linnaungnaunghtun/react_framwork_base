import BreadCrumb from "../../../components/BreadCrumb";
import CouponTable from "../components/CouponTable.jsx";

const CouponListPage = () => {
  return (
    <section>
        <BreadCrumb currentPageTitle={"Coupon Module"} />
        <CouponTable />
    </section>
  );
};

export default CouponListPage;
