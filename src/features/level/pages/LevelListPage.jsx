import BreadCrumb from "../../../components/BreadCrumb";
import LevelTable from "../components/LevelTable";

const LevelListPage = () => {
  return (
    <section>
        <BreadCrumb currentPageTitle={"Level Module"} />
        <LevelTable />
    </section>
  );
};

export default LevelListPage;
