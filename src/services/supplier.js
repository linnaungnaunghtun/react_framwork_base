import { getCookie } from "react-use-cookie";

export const supplierApiUrl = `${import.meta.env.VITE_API_URL}/supplier`;

export const storeSupplier = (data) => {
  return fetch(supplierApiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const destroySupplier = (id) => {
  return fetch(`${supplierApiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const updateSupplier = (data) => {
  return fetch(`${supplierApiUrl}/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const fetchSupplier = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => res.json());
