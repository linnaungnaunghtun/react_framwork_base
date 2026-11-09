import { getCookie } from "react-use-cookie";

export const purchaseApiUrl = `${import.meta.env.VITE_API_URL}/purchase`;
export const purchaseItemApiUrl = `${
  import.meta.env.VITE_API_URL
}/purchase-item`;
export const storePurchase = (data) => {
  return fetch(purchaseApiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const destroyPurchase = (id) => {
  return fetch(`${purchaseApiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const updatePurchase = (data) => {
  return fetch(`${purchaseApiUrl}/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const fetchPurchase = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => res.json());

export const fetchPurchaseItem = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => res.json());
};

export const fetchPurchaseDetails = (id) => {
  return fetch(`${import.meta.env.VITE_API_URL}/purchase-item-multiple/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch purchase details");
    }
    return res.json();
  });
};
