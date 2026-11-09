import BreadCrumb from "../../../components/BreadCrumb.jsx";
import CategoryTable from "../components/CategoryTable.jsx";

const CategoryListPage = () => {
  return (
    <section>
      <BreadCrumb currentPageTitle={"Category Module"} />
      <CategoryTable />
    </section>
  );
};

export default CategoryListPage;
