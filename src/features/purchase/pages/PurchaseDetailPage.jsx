import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { productApiUrl, fetchProduct } from "../../../services/product";
import { supplierApiUrl, fetchSupplier } from "../../../services/supplier";
import { fetchPurchaseDetails } from "../../../services/purchase";

const PurchaseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchaseData, setPurchaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch purchase details
  useEffect(() => {
    const loadPurchaseDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchPurchaseDetails(id);
        setPurchaseData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching purchase details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPurchaseDetails();
    }
  }, [id]);

  // Fetch products for display
  const { data: productsData } = useSWR(
    `${productApiUrl}?per_page=1000`,
    fetchProduct
  );
  const products = productsData?.data || [];

  // Fetch suppliers for display
  const { data: suppliersData } = useSWR(`${supplierApiUrl}`, fetchSupplier);
  const suppliers = suppliersData?.data || [];

  // Helper functions
  const getProductName = (productId) => {
    const product = products.find((p) => p.id == productId);
    return product ? product.name : "Unknown Product";
  };

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find((s) => s.id == supplierId);
    return supplier ? supplier.name : "Unknown Supplier";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate("/dashboard/purchases")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Back to Purchases
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!purchaseData) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <p className="text-gray-600">Purchase not found</p>
          </div>
        </div>
      </div>
    );
  }

  const { purchase, items, item_count } = purchaseData;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase Detail</h1>
          <p className="text-gray-600">Purchase ID: #{purchase.id}</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/purchases")}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          ← Back to Purchases
        </button>
      </div>

      {/* Purchase Information */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Purchase Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Purchase ID
            </label>
            <p className="text-lg font-semibold text-gray-900">
              #{purchase.id}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Supplier
            </label>
            <p className="text-lg font-semibold text-gray-900">
              {getSupplierName(purchase.supplier_id)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Purchase Date
            </label>
            <p className="text-lg font-semibold text-gray-900">
              {formatDate(purchase.date)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Total Amount
            </label>
            <p className="text-2xl font-bold text-blue-600">
              ${purchase.total_amount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Created At
              </label>
              <p className="text-sm text-gray-900">
                {formatDateTime(purchase.created_at)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Updated At
              </label>
              <p className="text-sm text-gray-900">
                {formatDateTime(purchase.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Items */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Purchase Items
          </h2>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {item_count} item{item_count !== 1 ? "s" : ""}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No items found for this purchase</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => {
                  const total = item.quantity * item.cost_price;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {getProductName(item.product_id)}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {item.product_id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item.cost_price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${total.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-right text-sm font-medium text-gray-900"
                  >
                    Grand Total:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    ${purchase.total_amount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">#</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Items Count</p>
              <p className="text-2xl font-semibold text-gray-900">
                {item_count}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">$</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Amount</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${purchase.total_amount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">📅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Purchase Date</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(purchase.date)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailPage;
