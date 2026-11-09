import BreadCrumb from "../../../components/BreadCrumb";
import VoucherDetail from "../components/VoucherDetail";

const VoucherDetailPage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Voucher Detail"}
        links={[{ title: "Voucher Module", path: "/dashboard/vouchers" }]}
      />
      <VoucherDetail />
    </section>
  );
};

export default VoucherDetailPage;
