import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateRandomVoucherId, today } from "../utils/general";

const useVoucherStore = create((set) => ({
  items: [],
  discountPercentage: "",
  cashDiscount: "",
  voucherId: generateRandomVoucherId(),
  voucherDate: today(),
  tax: false,
  addItem: (item) => {
    set((state) => ({ items: [...state.items, item] }));
  },
  updateDisplayPrice: (currentBarcode, newDisplayPrice) => {
    set((state) => ({
      items: state.items.map((el) =>
        el.barcode === currentBarcode
          ? {
              ...el,
              product: {
                ...el.product,
                display_price: newDisplayPrice,
                sale_price: newDisplayPrice - el.product.discount,
              },
            }
          : el
      ),
    }));
  },
  updateDiscount: (currentBarcode, newDiscount) => {
    set((state) => ({
      items: state.items.map((el) =>
        el.barcode === currentBarcode
          ? {
              ...el,
              product: {
                ...el.product,
                discount: newDiscount,
                sale_price: el.product.display_price - newDiscount,
              },
            }
          : el
      ),
    }));
  },
  removeItem: (currentBarcode) => {
    set((state) => ({
      items: state.items.filter((el) => el.barcode !== currentBarcode),
    }));
  },
  setDiscountPercentage: (newDiscountPercentage) => {
    set({ discountPercentage: newDiscountPercentage });
  },
  setCashDiscount: (newCashDiscount) => {
    set({ cashDiscount: newCashDiscount });
  },
  setVoucherId: (newVoucherId) => {
    set({ voucherId: newVoucherId });
  },
  setVoucherDate: (newVoucherDate) => {
    set({ voucherDate: newVoucherDate });
  },
  setTax: (newTax) => {
    set({ tax: newTax });
  },

  resetVoucher: () => {
    set({
      items: [],
      discountPercentage: "",
      cashDiscount: "",
      voucherId: generateRandomVoucherId(),
      voucherDate: today(),
      tax: false,
    });
  },
}));

export default useVoucherStore;
