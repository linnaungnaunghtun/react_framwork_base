import BreadCrumb from "../../../components/BreadCrumb";
import CustomerTable from "../components/CustomerTable";

const CustomerListPage = () => {
  return (
    <section>
      <BreadCrumb currentPageTitle={"Customer Module"} />
      <CustomerTable />
    </section>
  );
};

export default CustomerListPage;
