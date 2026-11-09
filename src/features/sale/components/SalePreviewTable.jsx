import useSWR from "swr";
import { productApiUrl, fetchProduct } from "../../../services/product";

function SalePreviewTable({ items, discount_percentage = 0 }) {
  const { data } = useSWR(`${productApiUrl}?per_page=1000`, fetchProduct);
  const products = data?.data || [];

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "Unknown Product";
  };

  const getSubtotal = () => {
    return items
      .filter((item) => item != null)
      .reduce((total, item) => {
        const price = parseFloat(item?.price) || 0;
        const quantity = parseInt(item?.quantity) || 0;
        return total + price * quantity;
      }, 0);
  };

  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    return (subtotal * discount_percentage) / 100;
  };

  const getTotalAmount = () => {
    const subtotal = getSubtotal();
    const discountAmount = getDiscountAmount();
    return subtotal - discountAmount;
  };

  if (items.length === 0 || items.every((item) => !item?.product_id)) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-8 text-gray-500">
          <p>No items added yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sale Total</h3>

        {/* Subtotal */}
        <div className="text-xl font-medium text-gray-700 mb-2">
          Subtotal: ${getSubtotal().toFixed(2)}
        </div>

        {/* Discount */}
        {discount_percentage > 0 && (
          <div className="text-lg font-medium text-red-600 mb-2">
            Discount ({discount_percentage}%): -$
            {getDiscountAmount().toFixed(2)}
          </div>
        )}

        {/* Total */}
        <div className="text-3xl font-bold text-blue-600">
          Total: ${getTotalAmount().toFixed(2)}
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {
            items.filter(
              (item) => item?.product_id && item?.quantity && item?.price
            ).length
          }{" "}
          item(s) • Live total
        </p>
      </div>
    </div>
  );
}

export default SalePreviewTable;
