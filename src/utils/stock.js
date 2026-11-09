/**
 * Stock management utilities
 */

/**
 * Check if a product has low stock
 * @param {number} stock - Current stock quantity
 * @param {number} threshold - Low stock threshold
 * @returns {boolean} - True if stock is below threshold
 */
export const isLowStock = (stock, threshold) => {
  return stock <= threshold;
};

/**
 * Get stock status for a product
 * @param {number} stock - Current stock quantity
 * @param {number} threshold - Low stock threshold
 * @returns {string} - Stock status: 'out', 'low', 'normal'
 */
export const getStockStatus = (stock, threshold) => {
  if (stock <= 0) return "out";
  if (stock <= threshold) return "low";
  return "normal";
};

/**
 * Get stock status color for UI
 * @param {string} status - Stock status
 * @returns {string} - CSS color class
 */
export const getStockStatusColor = (status) => {
  switch (status) {
    case "out":
      return "text-red-600 bg-red-100";
    case "low":
      return "text-yellow-600 bg-yellow-100";
    case "normal":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

/**
 * Get stock status text for UI
 * @param {string} status - Stock status
 * @returns {string} - Display text
 */
export const getStockStatusText = (status) => {
  switch (status) {
    case "out":
      return "Out of Stock";
    case "low":
      return "Low Stock";
    case "normal":
      return "In Stock";
    default:
      return "Unknown";
  }
};

/**
 * Filter products by stock status
 * @param {Array} products - Array of products
 * @param {string} status - Stock status to filter by
 * @returns {Array} - Filtered products
 */
export const filterProductsByStockStatus = (products, status) => {
  return products.filter((product) => {
    const stockStatus = getStockStatus(product.stock, product.threshold);
    return stockStatus === status;
  });
};

/**
 * Get low stock products
 * @param {Array} products - Array of products
 * @returns {Array} - Products with low stock
 */
export const getLowStockProducts = (products) => {
  return filterProductsByStockStatus(products, "low");
};

/**
 * Get out of stock products
 * @param {Array} products - Array of products
 * @returns {Array} - Products out of stock
 */
export const getOutOfStockProducts = (products) => {
  return filterProductsByStockStatus(products, "out");
};

/**
 * Validate if enough stock is available for sale
 * @param {number} currentStock - Current stock quantity
 * @param {number} requestedQuantity - Quantity to sell
 * @returns {Object} - Validation result
 */
export const validateStockForSale = (currentStock, requestedQuantity) => {
  const isValid = currentStock >= requestedQuantity;
  const availableQuantity = Math.max(0, currentStock);

  return {
    isValid,
    availableQuantity,
    requestedQuantity,
    shortfall: isValid ? 0 : requestedQuantity - currentStock,
  };
};
