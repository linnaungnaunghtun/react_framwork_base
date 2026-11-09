import BreadCrumb from "../../../components/BreadCrumb";
import LevelCreateForm from "../components/LevelCreateForm";

const LevelCreatePage = () => {
  return (
    <section>
        <BreadCrumb
          currentPageTitle={"Create Level"}
          links={[{ title: "Level Module", path: "/dashboard/levels" }]}
        />
        <LevelCreateForm />
    </section>
  );
};

export default LevelCreatePage;
