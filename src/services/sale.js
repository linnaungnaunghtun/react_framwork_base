import { getCookie } from "react-use-cookie";

export const saleApiUrl = `${import.meta.env.VITE_API_URL}/sale`;

export const fetchSales = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => res.json());

export const storeSale = (data) => {
  return fetch(saleApiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const fetchSaleDetails = (id) => {
  return fetch(`${saleApiUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to fetch sale details: ${res.status} ${res.statusText}`
      );
    }
    return res.json();
  });
};

export const updateSale = (data) => {
  return fetch(`${saleApiUrl}/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const destroySale = (id) => {
  return fetch(`${saleApiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  });
};

export const fetchSaleItems = (id) => {
  return fetch(`${saleApiUrl}-item-multiple/${id}`, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to fetch sale items: ${res.status} ${res.statusText}`
      );
    }
    return res.json();
  });
};

// Alternative endpoint if the above doesn't work
export const fetchSaleItemsAlternative = (id) => {
  return fetch(`${import.meta.env.VITE_API_URL}/sale-item-multiple/${id}`, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to fetch sale items: ${res.status} ${res.statusText}`
      );
    }
    return res.json();
  });
};

// Analytics endpoints
// Note: These endpoints need to be implemented on your backend
// Expected endpoints:
// GET /api/v1/sale/analytics - General analytics data
// GET /api/v1/sale/analytics/by-period - Sales by period
// GET /api/v1/sale/analytics/top-products - Top selling products
// GET /api/v1/sale/analytics/trends - Sales trends over time
export const fetchSalesAnalytics = (params = {}) => {
  const queryParams = new URLSearchParams(params);
  return fetch(`${saleApiUrl}/analytics?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to fetch sales analytics: ${res.status} ${res.statusText}`
      );
    }
    return res.json();
  });
};

export const fetchSalesByPeriod = (period = "day", startDate, endDate) => {
  const params = new URLSearchParams({
    period,
    ...(startDate && { start_date: startDate }),
    ...(endDate && { end_date: endDate }),
  });
  return fetch(`${saleApiUrl}/analytics/by-period?${params}`, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to fetch sales by period: ${res.status} ${res.statusText}`
      );
    }
    return res.json();
  });
};

export const fetchTopProducts = (limit = 10, startDate, endDate) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    ...(startDate && { start_date: startDate }),
    ...(endDate && { end_date: endDate }),
  });
  return fetch(`${saleApiUrl}/analytics/top-products?${params}`, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to fetch top products: ${res.status} ${res.statusText}`
      );
    }
    return res.json();
  });
};

export const fetchSalesTrends = (period = "day", startDate, endDate) => {
  const params = new URLSearchParams({
    period,
    ...(startDate && { start_date: startDate }),
    ...(endDate && { end_date: endDate }),
  });
  return fetch(`${saleApiUrl}/analytics/trends?${params}`, {
    headers: {
      Authorization: `Bearer ${getCookie("my_token")}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to fetch sales trends: ${res.status} ${res.statusText}`
      );
    }
    return res.json();
  });
};
