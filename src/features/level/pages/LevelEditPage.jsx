import BreadCrumb from "../../../components/BreadCrumb";
import LevelEditForm from "../components/LevelEditForm";

const LevelEditPage = () => {
  return (
    <section>
        <BreadCrumb
          currentPageTitle={"Edit Level"}
          links={[{ title: "Level Module", path: "/dashboard/levels" }]}
        />
        <LevelEditForm />
    </section>
  );
};

export default LevelEditPage;
