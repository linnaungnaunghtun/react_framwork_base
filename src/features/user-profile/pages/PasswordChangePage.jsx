import React from 'react'
import BreadCrumb from '../../../components/BreadCrumb';
import ProfileChangePassword from '../components/ProfileChangePassword';

const PasswordChangePage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Change Your Password"}
        links={[
          {
            title: "User Profile",
            path: "/dashboard/user-profile",
          },
        ]}
      />
      <ProfileChangePassword/>
    </section>
  );
}

export default PasswordChangePage