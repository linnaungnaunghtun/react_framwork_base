import BreadCrumb from "../../../components/BreadCrumb.jsx";
import CategoryCreateForm from "../components/CategoryCreateForm.jsx";

const CategoryCreatePage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Create Category"}
        links={[{ title: "Category Module", path: "/dashboard/categorys" }]}
      />
      <CategoryCreateForm />
    </section>
  );
};

export default CategoryCreatePage;
