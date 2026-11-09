import { create } from "zustand";

const useSaleStore = create((set, get) => ({
  // Sale form state
  user_id: "",
  customer_id: "",
  date: new Date().toISOString().slice(0, 10), // Current date (YYYY-MM-DD)
  discount_percentage: 0,

  // Sale items state
  items: [],

  // Actions
  setUserID: (user_id) => set({ user_id }),
  setCustomerID: (customer_id) => set({ customer_id }),
  setDate: (date) => set({ date }),
  setDiscountPercentage: (discount_percentage) => set({ discount_percentage }),

  // Item management
  addItem: (item = null) => {
    const items = get().items;
    if (item) {
      set({ items: [...items, item] });
    } else {
      // Create a default empty item
      const newItem = {
        product_id: "",
        quantity: "",
        price: "",
        total: 0,
      };
      set({ items: [...items, newItem] });
    }
  },

  updateItem: (index, field, value) => {
    const items = get().items;
    const updatedItems = [...items];

    // Ensure the item exists at the index
    if (!updatedItems[index]) {
      updatedItems[index] = {
        product_id: "",
        quantity: "",
        price: "",
        total: 0,
      };
    }

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    // Recalculate total when quantity or price changes
    if (field === "quantity" || field === "price") {
      updatedItems[index].total =
        parseFloat(updatedItems[index].quantity || 0) *
        parseFloat(updatedItems[index].price || 0);
    }

    set({ items: updatedItems });
  },

  removeItem: (index) => {
    const items = get().items;
    set({ items: items.filter((_, i) => i !== index) });
  },

  clearItems: () => set({ items: [] }),

  // Calculate totals
  getSubtotal: () => {
    const items = get().items;
    return items.reduce((total, item) => total + (item.total || 0), 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    const discountPercentage = get().discount_percentage;
    return (subtotal * discountPercentage) / 100;
  },

  getTotalAmount: () => {
    const subtotal = get().getSubtotal();
    const discountAmount = get().getDiscountAmount();
    return subtotal - discountAmount;
  },

  // Reset form
  resetForm: () =>
    set({
      user_id: "",
      customer_id: "",
      date: new Date().toISOString().slice(0, 10),
      discount_percentage: 0,
      items: [],
    }),

  // Set form data for editing
  setFormData: (data) =>
    set({
      user_id: data.user_id || "",
      customer_id: data.customer_id || "",
      date: data.date || new Date().toISOString().slice(0, 16),
      discount_percentage: data.discount_percentage || 0,
      items: data.items || [],
    }),
}));

export default useSaleStore;
