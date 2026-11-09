import BreadCrumb from "../../../components/BreadCrumb";
import CustomerEditForm from "../components/CustomerEditForm";

const CustomerEditPage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Edit Customer"}
        links={[{ title: "Customer Module", path: "/dashboard/customers" }]}
      />
      <CustomerEditForm />
    </section>
  );
};

export default CustomerEditPage;
