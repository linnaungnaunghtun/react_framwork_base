import BreadCrumb from "../../../components/BreadCrumb.jsx";
import ProductEditForm from "../components/ProductEditForm.jsx";

const ProductEditPage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Edit Product"}
        links={[{ title: "Product Module", path: "/dashboard/products" }]}
      />
      <ProductEditForm />
    </section>
  );
};

export default ProductEditPage;
