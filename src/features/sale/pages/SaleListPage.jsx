import BreadCrumb from "../../../components/BreadCrumb.jsx";
import SaleTable from "../components/SaleTable.jsx";

const SaleListPage = () => {
  return (
    <section>
      <BreadCrumb currentPageTitle={"Sale Module"} />
      <SaleTable />
    </section>
  );
};

export default SaleListPage;
