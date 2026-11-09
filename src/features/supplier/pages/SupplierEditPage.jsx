import BreadCrumb from "../../../components/BreadCrumb.jsx";
import SupplierEditForm from "../components/SupplierEditForm.jsx";

const SupplierEditPage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Edit Supplier"}
        links={[{ title: "Supplier Module", path: "/dashboard/suppliers" }]}
      />
      <SupplierEditForm />
    </section>
  );
};

export default SupplierEditPage;
