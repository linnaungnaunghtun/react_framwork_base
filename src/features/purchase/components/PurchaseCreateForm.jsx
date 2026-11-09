import { usePurchaseStore } from "../../../stores/usePurchaseStore";
import { useCreatePurchase } from "../hooks/useCreatePurchase";
import PurchasePreviewTable from "./PurchasePreviewTable";
import useSWR from "swr";
import toast from "react-hot-toast";
import { productApiUrl, fetchProduct } from "../../../services/product";
import { supplierApiUrl, fetchSupplier } from "../../../services/supplier";

function PurchaseCreateForm() {
  const {
    supplier_id,
    date,
    items,
    setSupplier,
    setDate,
    addItem,
    removeItem,
    updateItem,
    reset,
  } = usePurchaseStore();

  const { createPurchase } = useCreatePurchase();

  // Helper function to get product cost price
  const getProductCostPrice = (productId) => {
    const product = products.find((p) => p.id == productId); // Use == for type coercion
    return product ? parseFloat(product.cost_price) : 0;
  };

  // Handle product selection with auto-fill cost price
  const handleProductChange = (index, productId) => {
    updateItem(index, "product_id", productId);
    if (productId) {
      const costPrice = getProductCostPrice(productId);
      console.log("Selected product ID:", productId, "Cost price:", costPrice); // Debug log
      updateItem(index, "cost_sell", costPrice > 0 ? costPrice.toString() : "");
    } else {
      updateItem(index, "cost_sell", "");
    }
  };

  // Fetch suppliers using SWR
  const fetchUrl = `${supplierApiUrl}?limit=1000`;
  const {
    data: suppliersData,
    isLoading: suppliersLoading,
    error: suppliersError,
  } = useSWR(fetchUrl, fetchSupplier);
  const suppliers = suppliersData?.data || [];

  // Fetch products using SWR
  const fetchUrlProduct = `${productApiUrl}?limit=1000`;
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useSWR(fetchUrlProduct, fetchProduct);
  const products = productsData?.data || [];

  // Debug log to see products data
  console.log("Products loaded:", products);
  console.log("Current items in store:", items);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!supplier_id) {
      toast.error("Please select a supplier");
      return;
    }

    if (items.length === 0 || items.every((item) => !item.product_id)) {
      toast.error("Please add at least one product");
      return;
    }

    // Filter out empty items and format for API
    const validItems = items.filter(
      (item) => item.product_id && item.quantity && item.cost_sell
    );

    if (validItems.length === 0) {
      toast.error("Please add valid products with quantities and cost prices");
      return;
    }

    // Format items for API - only send required fields
    const formattedItems = validItems.map((item) => ({
      product_id: item.product_id,
      quantity: parseInt(item.quantity),
      price: parseFloat(item.cost_sell),
    }));

    const purchaseData = {
      supplier_id,
      date,
      items: formattedItems,
    };

    console.log("Sending purchase data to API:", purchaseData);
    await createPurchase(purchaseData);
    reset();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Purchase</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Supplier and Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supplier Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier *
              </label>
              <select
                value={supplier_id}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select a supplier</option>
                {suppliersLoading ? (
                  <option disabled>Loading suppliers...</option>
                ) : (
                  suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Purchase Items */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Purchase Items
                </h3>
                <p className="text-sm text-gray-500">
                  {items.length} item{items.length !== 1 ? "s" : ""} in form
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  console.log("Adding new item. Current items before:", items);
                  addItem();
                  console.log("Item added. New items count:", items.length + 1);
                }}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
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
                items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    {/* Item number indicator */}
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product
                      </label>
                      <select
                        value={item.product_id}
                        onChange={(e) =>
                          handleProductChange(index, e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select a product</option>
                        {productsLoading ? (
                          <option disabled>Loading products...</option>
                        ) : (
                          products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name} - Cost: ${product.cost_price}
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(index, "quantity", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    {/* Cost Price Display - Read-only */}
                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cost Price
                        {item.product_id && item.cost_sell && (
                          <span className="text-xs text-primary-600 ml-1">
                            (auto)
                          </span>
                        )}
                      </label>
                      <div className="w-full border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-700">
                        {item.cost_sell
                          ? `$${parseFloat(item.cost_sell).toFixed(2)}`
                          : "Select product"}
                      </div>
                    </div>

                    {/* Cost Price - Hidden input, only for data storage */}
                    <input
                      type="hidden"
                      value={item.cost_sell}
                      onChange={(e) =>
                        updateItem(index, "cost_sell", e.target.value)
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
            <PurchasePreviewTable items={items} />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={reset}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Save Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PurchaseCreateForm;
