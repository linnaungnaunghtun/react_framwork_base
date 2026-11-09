import BreadCrumb from "../../../components/BreadCrumb.jsx";
import PurchaseEditForm from "../components/PurchaseEditForm.jsx";

const PurchaseEditPage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Edit Purchase"}
        links={[{ title: "Purchase Module", path: "/dashboard/purchases" }]}
      />
      <PurchaseEditForm />
    </section>
  );
};

export default PurchaseEditPage;
