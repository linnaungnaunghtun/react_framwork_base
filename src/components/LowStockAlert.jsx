import { HiExclamationTriangle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { getLowStockProducts, getOutOfStockProducts } from "../utils/stock.js";

const LowStockAlert = ({ products = [] }) => {
  const lowStockProducts = getLowStockProducts(products);
  const outOfStockProducts = getOutOfStockProducts(products);
  const totalAlerts = lowStockProducts.length + outOfStockProducts.length;

  if (totalAlerts === 0) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <HiExclamationTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-yellow-800">Stock Alert</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              {outOfStockProducts.length > 0 && (
                <span className="font-semibold text-red-600">
                  {outOfStockProducts.length} product
                  {outOfStockProducts.length !== 1 ? "s" : ""} out of stock
                </span>
              )}
              {outOfStockProducts.length > 0 &&
                lowStockProducts.length > 0 &&
                " and "}
              {lowStockProducts.length > 0 && (
                <span className="font-semibold text-yellow-600">
                  {lowStockProducts.length} product
                  {lowStockProducts.length !== 1 ? "s" : ""} with low stock
                </span>
              )}
            </p>
            <div className="mt-2">
              <Link
                to="/dashboard/products"
                className="font-medium text-yellow-800 underline hover:text-yellow-900"
              >
                View products →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowStockAlert;
