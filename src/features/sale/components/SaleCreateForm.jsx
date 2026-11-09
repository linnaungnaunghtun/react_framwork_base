import React from "react";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi2";
import { HiRefresh } from "react-icons/hi";
import useSaleStore from "../../../stores/useSaleStore";
import useCreateSale from "../hooks/useCreateSale";
import SalePreviewTable from "./SalePreviewTable";
import useSWR from "swr";
import toast from "react-hot-toast";
import { productApiUrl, fetchProduct } from "../../../services/product";
import { customerApiUrl, fetchCustomer } from "../../../services/customer";
import {
  validateStockForSale,
  getStockStatus,
  getStockStatusColor,
  getStockStatusText,
} from "../../../utils/stock";

function SaleCreateForm() {
  const {
    user_id,
    customer_id,
    date,
    discount_percentage,
    items,
    setUserID,
    setCustomerID,
    setDate,
    setDiscountPercentage,
    addItem,
    removeItem,
    updateItem,
    resetForm,
  } = useSaleStore();

  const { createSale } = useCreateSale();

  // Fetch customers using SWR
  const fetchUrlCustomer = `${customerApiUrl}?limit=1000`;
  const {
    data: customersData,
    isLoading: customersLoading,
    error: customersError,
    mutate: mutateCustomers,
  } = useSWR(fetchUrlCustomer, fetchCustomer);
  const customers = customersData?.data || [];

  // Function to refresh customers list
  const refreshCustomers = () => {
    mutateCustomers();
    toast.success("Customer list refreshed");
  };

  // Fetch products using SWR
  const fetchUrlProduct = `${productApiUrl}?limit=1000`;
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useSWR(fetchUrlProduct, fetchProduct);
  const products = productsData?.data || [];

  console.log("products", products);

  // Helper function to get product sell price
  const getProductSellPrice = (productId) => {
    const product = products.find((p) => p.id == productId);
    return product ? parseFloat(product.sell_price) : 0;
  };

  // Handle product selection with auto-fill sell price
  const handleProductChange = (index, productId) => {
    updateItem(index, "product_id", productId);
    if (productId) {
      const sellPrice = getProductSellPrice(productId);
      updateItem(index, "price", sellPrice > 0 ? sellPrice.toString() : "");
    } else {
      updateItem(index, "price", "");
    }
  };

  // Show error toast if products fail to load
  React.useEffect(() => {
    if (productsError) {
      toast.error("Failed to load products. Please refresh the page.");
    }
  }, [productsError]);

  // Helper function to get customer discount from level
  const getCustomerDiscount = (customer) => {
    if (!customer || !customer.level) return 0;

    // Get discount from customer's level
    return parseFloat(customer.level.discount) || 0;
  };

  const handleCustomerChange = (customerId) => {
    setCustomerID(customerId);

    // Auto-set user_id to 1 (assuming current user)
    setUserID("1");

    // Auto-set discount based on customer
    if (customerId) {
      const customer = customers.find((c) => c.id == customerId);
      const discount = getCustomerDiscount(customer);
      setDiscountPercentage(discount);
    } else {
      // Reset discount when no customer selected
      setDiscountPercentage(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!customer_id) {
      toast.error("Please select a customer");
      return;
    }

    if (items.length === 0 || items.every((item) => !item.product_id)) {
      toast.error("Please add at least one product");
      return;
    }

    // Filter out empty items and format for API
    const validItems = items.filter(
      (item) => item.product_id && item.quantity && item.price
    );

    if (validItems.length === 0) {
      toast.error("Please add valid products with quantities and prices");
      return;
    }

    // Validate stock availability for each item
    const stockValidationErrors = [];
    for (const item of validItems) {
      const product = products.find((p) => p.id == item.product_id);
      if (product) {
        const stockValidation = validateStockForSale(
          product.stock,
          parseInt(item.quantity)
        );
        if (!stockValidation.isValid) {
          stockValidationErrors.push({
            productName: product.name,
            requestedQuantity: stockValidation.requestedQuantity,
            availableQuantity: stockValidation.availableQuantity,
            shortfall: stockValidation.shortfall,
          });
        }
      }
    }

    // If there are stock validation errors, show them and prevent sale
    if (stockValidationErrors.length > 0) {
      let errorMessage = "Cannot complete sale due to insufficient stock:\n\n";
      stockValidationErrors.forEach((error) => {
        errorMessage += `• ${error.productName}: Requested ${error.requestedQuantity}, Available ${error.availableQuantity} (Shortfall: ${error.shortfall})\n`;
      });
      toast.error(errorMessage);
      return;
    }

    // Format items for API
    const formattedItems = validItems.map((item) => ({
      product_id: item.product_id,
      quantity: parseInt(item.quantity),
      price: parseFloat(item.price),
    }));

    const saleData = {
      user_id,
      customer_id,
      date,
      discount_percentage,
      items: formattedItems,
    };

    await createSale(saleData);
    resetForm();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Sale</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer and Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Customer *
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={refreshCustomers}
                    className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 font-medium"
                    title="Refresh customer list"
                  >
                    <HiRefresh size={14} />
                    Refresh
                  </button>
                  <Link
                    to="/dashboard/customer-create"
                    className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800 font-medium"
                  >
                    <HiPlus size={14} />
                    Add New Customer
                  </Link>
                </div>
              </div>
              <select
                value={customer_id}
                onChange={(e) => handleCustomerChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a customer</option>
                {customersLoading ? (
                  <option disabled>Loading customers...</option>
                ) : (
                  customers.map((customer) => {
                    const discount = getCustomerDiscount(customer);
                    const levelName = customer.level?.name || "No Level";
                    return (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} - {customer.email} - Level: {levelName}
                        {discount > 0 ? ` (${discount}% discount)` : ""}
                      </option>
                    );
                  })
                )}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sale Date *
              </label>
              <input
                type="date"
                value={date || new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Discount Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Discount Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Percentage (%)
                {discount_percentage > 0 && (
                  <span className="text-green-600 text-xs ml-2">
                    Auto-applied from customer level
                  </span>
                )}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={discount_percentage}
                onChange={(e) =>
                  setDiscountPercentage(parseFloat(e.target.value))
                }
                className={`w-full border ${
                  discount_percentage > 0
                    ? "border-green-300 focus:ring-green-500 focus:border-green-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2`}
                placeholder="0.00"
              />
              {discount_percentage > 0 && (
                <p className="text-green-600 text-xs mt-1">
                  Discount automatically applied from customer's level. You can
                  modify this value if needed.
                </p>
              )}
            </div>
          </div>

          {/* Sale Items */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sale Items
                </h3>
                <p className="text-sm text-gray-500">
                  {items.length} item{items.length !== 1 ? "s" : ""} in form
                </p>
              </div>
              <button
                type="button"
                onClick={() => addItem()}
                className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                + Add Item ({items.length + 1})
              </button>
            </div>

            <div className="space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No items added yet. Click "Add Item" to start.</p>
                </div>
              ) : (
                items
                  .filter((item) => item != null)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 items-center p-4 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      {/* Item number indicator */}
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product
                        </label>
                        <div className="space-y-2">
                          {/* Product Code Input */}
                          <input
                            type="text"
                            placeholder="Enter product code or barcode to auto-select"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const code = e.target.value.trim();
                                if (code) {
                                  // Search by both code and barcode fields
                                  const product = products.find(
                                    (p) =>
                                      (p.code &&
                                        p.code.toLowerCase().trim() ===
                                          code.toLowerCase()) ||
                                      (p.barcode &&
                                        p.barcode.toLowerCase().trim() ===
                                          code.toLowerCase())
                                  );
                                  if (product) {
                                    handleProductChange(index, product.id);
                                    e.target.value = "";
                                    toast.success(
                                      `Product "${product.name}" selected`
                                    );
                                  } else {
                                    toast.error(
                                      `Product with code/barcode "${code}" not found`
                                    );
                                  }
                                }
                              }
                            }}
                          />
                          {/* Product Selection Dropdown */}
                          <select
                            value={item?.product_id || ""}
                            onChange={(e) =>
                              handleProductChange(index, e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={productsLoading}
                          >
                            <option value="">Select a product</option>
                            {productsLoading ? (
                              <option disabled>Loading products...</option>
                            ) : productsError ? (
                              <option disabled>Error loading products</option>
                            ) : products.length === 0 ? (
                              <option disabled>No products available</option>
                            ) : (
                              products.map((product) => {
                                const stockStatus = getStockStatus(
                                  product.stock,
                                  product.threshold
                                );
                                const stockStatusText =
                                  getStockStatusText(stockStatus);
                                return (
                                  <option
                                    key={product.id}
                                    value={product.id}
                                    disabled={stockStatus === "out"}
                                  >
                                    {product.code ? `[${product.code}] ` : ""}
                                    {product.name} - Stock: {product.stock} -
                                    Price: ${product.sell_price}
                                    {stockStatus !== "normal" &&
                                      ` (${stockStatusText})`}
                                  </option>
                                );
                              })
                            )}
                          </select>
                        </div>
                      </div>

                      <div className="w-32">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity
                        </label>
                        <input
                          type="number"
                          min="1"
                          placeholder="Qty"
                          value={item?.quantity || ""}
                          onChange={(e) =>
                            updateItem(index, "quantity", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Price Display - Read-only */}
                      <div className="w-32">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price
                          {item?.product_id && item?.price && (
                            <span className="text-xs text-green-600 ml-1">
                              (auto)
                            </span>
                          )}
                        </label>
                        <div className="w-full border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-700">
                          {item?.price
                            ? `$${parseFloat(item.price).toFixed(2)}`
                            : "Select product"}
                        </div>
                      </div>

                      {/* Price - Hidden input, only for data storage */}
                      <input
                        type="hidden"
                        value={item?.price || ""}
                        onChange={(e) =>
                          updateItem(index, "price", e.target.value)
                        }
                      />

                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors mt-6"
                      >
                        Remove
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Preview Table */}
          <div>
            <SalePreviewTable
              items={items}
              discount_percentage={discount_percentage}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-prima-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Save Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SaleCreateForm;
