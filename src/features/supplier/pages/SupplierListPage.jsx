import BreadCrumb from "../../../components/BreadCrumb.jsx";
import SupplierTable from "../components/SupplierTable.jsx";

const SupplierListPage = () => {
  return (
    <section>
      <BreadCrumb currentPageTitle={"Supplier Module"} />
      <SupplierTable />
    </section>
  );
};

export default SupplierListPage;
