import exp from "constants";
import { getCookie } from "react-use-cookie";
import { updateStockAfterSale } from "./stock";

export const voucherApiUrl = `${import.meta.env.VITE_API_URL}/vouchers`;

export const storeVoucher = async (data) => {
  const res = await fetch(voucherApiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });

  // If voucher creation is successful, update stock
  if (res.ok && data.items) {
    try {
      const stockUpdatePromises = data.items.map((item) =>
        updateStockAfterSale(item.product.id, item.quantity)
      );

      await Promise.all(stockUpdatePromises);
      console.log("Stock updated successfully for all voucher items");
    } catch (stockError) {
      console.error("Error updating stock for voucher:", stockError);
      // Don't fail the voucher if stock update fails, but log the error
    }
  }

  return res;
};

export const updateVoucher = (id, data) => {};

export const destroyVoucher = (id) => {
  return fetch(`${voucherApiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const fetchVoucher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => res.json());
