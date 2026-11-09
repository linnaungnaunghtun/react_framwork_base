
import BreadCrumb from "../../../components/BreadCrumb";
import UserProfileCard from "../components/UserProfileCard";

const UserProfilePage = () => {
  return (
    <section>
        <BreadCrumb currentPageTitle={"User Profile"} />
        <UserProfileCard />
    </section>
  );
};

export default UserProfilePage;
