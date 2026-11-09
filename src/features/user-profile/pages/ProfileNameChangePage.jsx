import BreadCrumb from "../../../components/BreadCrumb";
import ProfileNameChangeCard from "../components/ProfileNameChangeCard";

const ProfileNameChangePage = () => {
  return (
    <section>
        <BreadCrumb
          currentPageTitle={"Change Your Name"}
          links={[{ title: "User Profile", path: "/dashboard/user-profile" }]}
        />
        <ProfileNameChangeCard />
    </section>
  );
};

export default ProfileNameChangePage;
