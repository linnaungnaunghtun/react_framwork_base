import BreadCrumb from "../../../components/BreadCrumb";
import VoucherTable from "../components/VoucherTable";

const VoucherListPage = () => {
  return (
    <section>
      <BreadCrumb currentPageTitle={"Voucher Module"} />
      <VoucherTable />
    </section>
  );
};

export default VoucherListPage;
