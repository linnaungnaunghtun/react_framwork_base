import useVoucherStore from "../../../stores/useVoucherStore";

const useCalculate = () => {
  const { items, tax, discountPercentage, cashDiscount } = useVoucherStore();

  const total = items.reduce((pv, cv) => pv + cv.product.sale_price, 0);
  const discountPercentageAmount = discountPercentage
    ? (total * discountPercentage) / 100
    : 0;
  const cashDiscountAmount = cashDiscount ? cashDiscount : 0;

  const discountedTotal =
    total - (Number(discountPercentageAmount) + Number(cashDiscountAmount));

  const taxAmount = tax ? discountedTotal * 0.05 : 0;
  const netTotal = discountedTotal + taxAmount;

  return {
    total,
    items,
    tax,
    discountPercentage,
    cashDiscount,
    discountPercentageAmount,
    cashDiscountAmount,
    discountedTotal,
    taxAmount,
    netTotal,
  };
};

export default useCalculate;
