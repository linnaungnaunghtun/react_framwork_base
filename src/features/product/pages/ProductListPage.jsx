import BreadCrumb from "../../../components/BreadCrumb.jsx";
import ProductTable from "../components/ProductTable.jsx";

const ProductListPage = () => {
  return (
    <section>
      <BreadCrumb currentPageTitle={"Product Module"} />
      <ProductTable />
    </section>
  );
};

export default ProductListPage;
