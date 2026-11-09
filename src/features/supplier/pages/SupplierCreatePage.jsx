import BreadCrumb from "../../../components/BreadCrumb.jsx";
import SupplierCreateForm from "../components/SupplierCreateForm.jsx";

const SupplierCreatePage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Create Supplier"}
        links={[{ title: "Supplier Module", path: "/dashboard/suppliers" }]}
      />
      <SupplierCreateForm />
    </section>
  );
};

export default SupplierCreatePage;
