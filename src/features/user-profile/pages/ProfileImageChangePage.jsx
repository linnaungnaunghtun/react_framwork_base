import BreadCrumb from "../../../components/BreadCrumb";
import ProfileImageChange from "../components/ProfileImageChange";

const ProfileNameChangePage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Change Your Image"}
        links={[
          {
            title: "User Profile",
            path: "/dashboard/user-profile",
          },
        ]}
      />
      <ProfileImageChange />
    </section>
  );
};

export default ProfileNameChangePage;
