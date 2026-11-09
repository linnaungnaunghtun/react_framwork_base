import BreadCrumb from "../../../components/BreadCrumb.jsx";
import PurchaseTable from "../components/PurchaseTable.jsx";

const PurchaseListPage = () => {
  return (
    <section>
      <BreadCrumb currentPageTitle={"Purchase Module"} />
      <PurchaseTable />
    </section>
  );
};

export default PurchaseListPage;
