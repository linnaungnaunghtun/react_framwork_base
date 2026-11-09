import BreadCrumb from "../../../components/BreadCrumb.jsx";
import CategoryEditForm from "../components/CategoryEditForm.jsx";

const CategoryEditPage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Edit Category"}
        links={[{ title: "Category Module", path: "/dashboard/categorys" }]}
      />
      <CategoryEditForm />
    </section>
  );
};

export default CategoryEditPage;
