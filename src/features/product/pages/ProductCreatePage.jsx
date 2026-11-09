import BreadCrumb from "../../../components/BreadCrumb.jsx";
import ProductCreateForm from "../components/ProductCreateForm.jsx";

const ProductCreatePage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Create Product"}
        links={[{ title: "Product Module", path: "/dashboard/products" }]}
      />
      <ProductCreateForm />
    </section>
  );
};

export default ProductCreatePage;
