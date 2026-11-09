import useSWR from "swr";
import { productApiUrl, fetchProduct } from "../../../services/product";

function PurchasePreviewTable({ items }) {
  const { data } = useSWR(`${productApiUrl}?per_page=1000`, fetchProduct);
  const products = data?.data || [];

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "Unknown Product";
  };

  const getTotalAmount = () => {
    return items.reduce((total, item) => {
      const costPrice = parseFloat(item.cost_sell) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + costPrice * quantity;
    }, 0);
  };

  if (items.length === 0 || items.every((item) => !item.product_id)) {
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Purchase Total
        </h3>
        <div className="text-3xl font-bold text-blue-600">
          ${getTotalAmount().toFixed(2)}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {
            items.filter(
              (item) => item.product_id && item.quantity && item.cost_sell
            ).length
          }{" "}
          item(s) • Live total
        </p>
      </div>
    </div>
  );
}

export default PurchasePreviewTable;
