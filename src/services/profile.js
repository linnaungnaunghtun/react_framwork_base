import { getCookie } from "react-use-cookie";

const token = getCookie("my_token");

export const profileApiUrl = `${import.meta.env.VITE_API_URL}/user-profile`;

export const checkProfile = async () => {
  return fetch(`${profileApiUrl}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeName = (data) => {
  // console.log(data);
  return fetch(profileApiUrl + `/change-name`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = (data) => {
  //  console.log(data);
  return fetch(profileApiUrl + `/change-password`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const changeImage = (data) => {
  return fetch(
    import.meta.env.VITE_API_URL + "/user-profile/change-profile-image",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
