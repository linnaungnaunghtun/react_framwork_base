import BreadCrumb from "../../../components/BreadCrumb";
import CustomerCreateForm from "../components/CustomerCreateForm";

const CustomerCreatePage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Create Customer"}
        links={[{ title: "Customer Module", path: "/dashboard/customers" }]}
      />
      <CustomerCreateForm />
    </section>
  );
};

export default CustomerCreatePage;
