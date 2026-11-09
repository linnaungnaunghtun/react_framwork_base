import { getCookie } from "react-use-cookie";

export const categoryApiUrl = `${import.meta.env.VITE_API_URL}/category`;

export const storeCategory = (data) => {
  return fetch(categoryApiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const destroyCategory = (id) => {
  return fetch(`${categoryApiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const updateCategory = (data) => {
  return fetch(`${categoryApiUrl}/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const fetchCategory = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => res.json());
