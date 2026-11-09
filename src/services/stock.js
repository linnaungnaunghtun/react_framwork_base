import { getCookie } from "react-use-cookie";

export const stockApiUrl = `${import.meta.env.VITE_API_URL}/stock`;

export const fetchStockWithBarcode = (barcode) =>
  fetch(`${stockApiUrl}/stock-with-barcode/${barcode}`, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });

export const storeStock = (data) => {
  return fetch(stockApiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const destroyStock = (id) => {
  return fetch(`${stockApiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const updateStock = (data) => {
  return fetch(`${stockApiUrl}/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const fetchStock = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => res.json());

/**
 * Update stock quantity for a product after sale
 * @param {number} productId - Product ID
 * @param {number} quantitySold - Quantity sold (will be subtracted from current stock)
 * @returns {Promise} - API response
 */
export const updateStockAfterSale = (productId, quantitySold) => {
  return fetch(`${stockApiUrl}/update-after-sale`, {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      quantity_sold: quantitySold,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};
