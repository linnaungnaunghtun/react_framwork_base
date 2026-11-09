import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { productApiUrl, fetchProduct } from "../../../services/product";
import { customerApiUrl, fetchCustomer } from "../../../services/customer";
import {
  fetchSaleDetails,
  fetchSaleItems,
  fetchSaleItemsAlternative,
} from "../../../services/sale";

const SaleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saleData, setSaleData] = useState(null);
  const [saleItemsData, setSaleItemsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sale details and items
  useEffect(() => {
    const loadSaleDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch sale details first
        const saleDetails = await fetchSaleDetails(id);
        console.log("Sale Details Response:", saleDetails);

        // Check if sale exists in the response
        if (!saleDetails) {
          console.log("No sale details received");
          setError("Sale not found");
          return;
        }

        console.log("Raw sale details structure:", saleDetails);

        // Handle different response structures for sale
        const sale = saleDetails.sale || saleDetails.data || saleDetails;
        console.log("Extracted sale object:", sale);

        if (!sale) {
          console.log("No sale object found in response");
          setError("Sale not found");
          return;
        }

        if (!sale.id) {
          console.log("Sale object found but no ID:", sale);
          setError("Invalid sale data - missing ID");
          return;
        }

        setSaleData(saleDetails);

        // Try to fetch sale items, but don't fail if it doesn't work
        try {
          const saleItems = await fetchSaleItems(id);
          console.log("Sale Items Response (primary):", saleItems);
          setSaleItemsData(saleItems);
        } catch (itemsError) {
          console.warn("Primary sale items endpoint failed:", itemsError);

          // Try alternative endpoint
          try {
            const saleItemsAlt = await fetchSaleItemsAlternative(id);
            console.log("Sale Items Response (alternative):", saleItemsAlt);
            setSaleItemsData(saleItemsAlt);
          } catch (altError) {
            console.warn(
              "Alternative sale items endpoint also failed:",
              altError
            );
            // Set empty items data but don't fail the whole page
            setSaleItemsData({ items: [], item_count: 0 });
          }
        }
      } catch (err) {
        console.error("Error fetching sale details:", err);

        // Handle different types of errors
        if (err.message.includes("404") || err.message.includes("not found")) {
          setError("Sale not found");
        } else if (
          err.message.includes("401") ||
          err.message.includes("unauthorized")
        ) {
          setError("Unauthorized access. Please login again.");
        } else if (
          err.message.includes("500") ||
          err.message.includes("server error")
        ) {
          setError("Server error. Please try again later.");
        } else {
          setError(err.message || "An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadSaleDetails();
    }
  }, [id]);

  // Fetch products for display
  const { data: productsData } = useSWR(
    `${productApiUrl}?per_page=1000`,
    fetchProduct
  );
  const products = productsData?.data || [];

  // Fetch customers for display
  const { data: customersData } = useSWR(`${customerApiUrl}`, fetchCustomer);
  const customers = customersData?.data || [];

  // Helper functions
  const getProductName = (productId) => {
    const product = products.find((p) => p.id == productId);
    return product ? product.name : "Unknown Product";
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id == customerId);
    return customer ? customer.name : "Unknown Customer";
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
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Error Loading Sale
            </h2>
            <p className="text-gray-600 mb-4">
              {error.includes("404") || error.includes("not found")
                ? "The sale you're looking for doesn't exist or may have been deleted."
                : "There was an error loading the sale details. Please try again."}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate("/dashboard/sales")}
                className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                ← Back to Sales
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // More flexible validation - check if we have any sale data
  if (!saleData) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Sale Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The sale you're looking for doesn't exist or may have been
              deleted.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate("/dashboard/sales")}
                className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                ← Back to Sales
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle different response structures
  let sale = saleData?.sale || saleData?.data || saleData;

  // Additional fallback - check if saleData itself is the sale object
  if (!sale && saleData && typeof saleData === "object" && saleData.id) {
    sale = saleData;
    console.log("Using saleData as sale object directly");
  }

  console.log("Final sale object for rendering:", sale);
  console.log("Sale has ID:", sale?.id);
  console.log("Sale type:", typeof sale);
  console.log("Sale keys:", sale ? Object.keys(sale) : "No sale object");

  // Try to get items from multiple sources
  let items = [];
  let item_count = 0;

  if (saleItemsData) {
    items = saleItemsData?.items || saleItemsData?.data?.items || [];
    item_count =
      saleItemsData?.item_count ||
      saleItemsData?.data?.item_count ||
      items.length;
  } else if (saleData?.items) {
    // Fallback: items might be in sale data
    items = saleData.items || [];
    item_count = saleData.item_count || items.length;
  } else if (sale?.items) {
    // Fallback: items might be in sale object
    items = sale.items || [];
    item_count = sale.item_count || items.length;
  }

  console.log("Rendering with sale:", sale);
  console.log("Rendering with items:", items);
  console.log("Rendering with item_count:", item_count);
  console.log("saleData:", saleData);
  console.log("saleItemsData:", saleItemsData);

  // Show loading if we don't have sale data yet
  if (!sale || !sale.id) {
    console.log("No valid sale object found, showing loading state");
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Loading Sale Data
            </h2>
            <p className="text-gray-600 mb-6">
              Please wait while we load the sale information...
            </p>
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4 mx-auto"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sale Detail</h1>
          <p className="text-gray-600">Sale ID: #{sale.id}</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/sales")}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          ← Back to Sales
        </button>
      </div>

      {/* Sale Information */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Sale Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Sale ID
            </label>
            <p className="text-lg font-semibold text-gray-900">#{sale.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Customer
            </label>
            <p className="text-lg font-semibold text-gray-900">
              {getCustomerName(sale.customer_id)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Sale Date
            </label>
            <p className="text-lg font-semibold text-gray-900">
              {formatDate(sale.date)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Total Amount
            </label>
            <p className="text-2xl font-bold text-blue-600">
              ${parseFloat(sale.total_amount).toFixed(2)}
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
                {formatDateTime(sale.created_at)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Updated At
              </label>
              <p className="text-sm text-gray-900">
                {formatDateTime(sale.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sale Items */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Sale Items</h2>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {item_count} item{item_count !== 1 ? "s" : ""}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-gray-400 text-4xl mb-4">📦</div>
            <p className="text-lg font-medium mb-2">No Items Found</p>
            <p className="text-sm">
              {saleItemsData === null
                ? "Unable to load sale items. The items endpoint may not be available."
                : "This sale doesn't have any items associated with it."}
            </p>
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
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => {
                  const total = item.quantity * item.price;
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
                        ${parseFloat(item.price).toFixed(2)}
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
                    ${parseFloat(sale.total_amount).toFixed(2)}
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
                ${parseFloat(sale.total_amount).toFixed(2)}
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
              <p className="text-sm font-medium text-gray-500">Sale Date</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(sale.date)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailPage;
