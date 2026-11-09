import { create } from "zustand";
import toast from "react-hot-toast";
import { getCookie } from "react-use-cookie";

export const usePurchaseStore = create((set, get) => ({
  supplier_id: "",
  date: new Date().toISOString().split("T")[0],
  items: [],

  setSupplier: (supplier_id) => set({ supplier_id }),
  setDate: (date) => set({ date }),

  addItem: () =>
    set((state) => ({
      items: [...state.items, { product_id: "", quantity: "", cost_sell: "" }],
    })),

  removeItem: (index) =>
    set((state) => ({
      items: state.items.filter((_, i) => i !== index),
    })),

  updateItem: (index, field, value) =>
    set((state) => {
      const updated = [...state.items];
      updated[index][field] = value;
      return { items: updated };
    }),

  reset: () =>
    set({
      supplier_id: "",
      date: new Date().toISOString().split("T")[0],
      items: [],
    }),

  submitPurchase: async () => {
    const state = get();
    const purchaseData = {
      supplier_id: state.supplier_id,
      date: state.date,
      items: state.items,
    };

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("my_token")}`,
        },
        body: JSON.stringify(purchaseData),
      });

      if (!res.ok) throw new Error("Failed to save purchase");

      const data = await res.json();
      toast.success("Purchase saved:", data);
      toast.success("Purchase saved successfully");
      get().reset();
    } catch (err) {
      toast.error("An error occurred while saving the purchase.");
      console.error("Error:", err);
    }
  },
}));
