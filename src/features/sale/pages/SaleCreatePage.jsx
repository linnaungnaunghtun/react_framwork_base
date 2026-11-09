import SaleCreateForm from "../components/SaleCreateForm";
import BreadCrumb from "../../../components/BreadCrumb";

const SaleCreatePage = () => {
  return (
    <div className="space-y-6">
      <BreadCrumb
        currentPageTitle={"Sale Module"}
      />
      <SaleCreateForm />
    </div>
  );
};

export default SaleCreatePage;
