import BreadCrumb from "../../../components/BreadCrumb.jsx";
import PurchaseCreateForm from "../components/PurchaseCreateForm.jsx";

const PurchaseCreatePage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Create Purchase"}
        links={[{ title: "Purchase Module", path: "/dashboard/purchases" }]}
      />
      <PurchaseCreateForm />
    </section>
  );
};

export default PurchaseCreatePage;
