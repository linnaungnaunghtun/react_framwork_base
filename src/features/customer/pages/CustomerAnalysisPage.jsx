import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { customerApiUrl, fetchCustomer } from "../../../services/customer";
import { saleApiUrl, fetchSales } from "../../../services/sale";
import useSWR from "swr";
import BreadCrumb from "../../../components/BreadCrumb";

const CustomerAnalysisPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [trendsData, setTrendsData] = useState([]);
  const [topCustomersData, setTopCustomersData] = useState([]);
  const [customerLevelsData, setCustomerLevelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customers and sales data
  const { data: customersData, error: customersError } = useSWR(
    `${customerApiUrl}?limit=1000`,
    fetchCustomer
  );
  const { data: salesData, error: salesError } = useSWR(
    `${saleApiUrl}?limit=1000`,
    fetchSales
  );
  const customers = customersData?.data || [];
  const sales = salesData?.data || [];

  // Set default date range (last 30 days)
  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    setEndDate(today.toISOString().split("T")[0]);
    setStartDate(thirtyDaysAgo.toISOString().split("T")[0]);
  }, []);

  // Generate analytics data
  useEffect(() => {
    const loadAnalyticsData = async () => {
      if (!startDate || !endDate || !customers.length || !sales.length) return;

      try {
        setLoading(true);
        setError(null);

        // Generate customer analytics from available data
        const analytics = generateCustomerAnalytics();
        const trends = generateCustomerTrendsData();
        const topCustomers = generateTopCustomersData();
        const levels = generateCustomerLevelsData();

        setAnalyticsData(analytics);
        setTrendsData(trends);
        setTopCustomersData(topCustomers);
        setCustomerLevelsData(levels);
      } catch (err) {
        console.error("Error loading customer analytics data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, [selectedPeriod, startDate, endDate, customers, sales]);

  const generateCustomerAnalytics = () => {
    const totalCustomers = customers.length;
    const activeCustomers = sales.reduce((acc, sale) => {
      if (!acc.includes(sale.customer_id)) {
        acc.push(sale.customer_id);
      }
      return acc;
    }, []).length;

    const totalSales = sales.reduce(
      (sum, sale) => sum + (sale.total_amount || 0),
      0
    );
    const averageOrderValue = sales.length > 0 ? totalSales / sales.length : 0;
    const customerRetentionRate =
      activeCustomers > 0 ? (activeCustomers / totalCustomers) * 100 : 0;

    // Find top customer by total sales
    const customerSales = {};
    sales.forEach((sale) => {
      if (sale.customer_id) {
        customerSales[sale.customer_id] =
          (customerSales[sale.customer_id] || 0) + (sale.total_amount || 0);
      }
    });

    const topCustomerId = Object.keys(customerSales).reduce(
      (a, b) => (customerSales[a] > customerSales[b] ? a : b),
      Object.keys(customerSales)[0]
    );
    const topCustomer = customers.find((c) => c.id == topCustomerId);

    return {
      total_customers: totalCustomers,
      active_customers: activeCustomers,
      total_sales: totalSales,
      average_order_value: averageOrderValue,
      customer_retention_rate: customerRetentionRate,
      top_customer: topCustomer?.name || "N/A",
      top_customer_sales: customerSales[topCustomerId] || 0,
      new_customers_this_month: customers.filter((c) => {
        const createdDate = new Date(c.created_at || c.createdAt);
        const thisMonth = new Date();
        thisMonth.setDate(1);
        return createdDate >= thisMonth;
      }).length,
    };
  };

  const generateCustomerTrendsData = () => {
    const data = [];
    const days =
      selectedPeriod === "day" ? 30 : selectedPeriod === "month" ? 12 : 5;

    for (let i = 0; i < days; i++) {
      const date = new Date();
      if (selectedPeriod === "day") {
        date.setDate(date.getDate() - (days - 1 - i));
        const dateStr = date.toISOString().split("T")[0];

        // Count customers who made purchases on this date
        const daySales = sales.filter((sale) => {
          const saleDate = new Date(sale.date || sale.created_at);
          return saleDate.toISOString().split("T")[0] === dateStr;
        });
        const uniqueCustomers = [
          ...new Set(daySales.map((sale) => sale.customer_id)),
        ].length;

        data.push({
          date: dateStr,
          customers: uniqueCustomers,
          orders: daySales.length,
          sales: daySales.reduce(
            (sum, sale) => sum + (sale.total_amount || 0),
            0
          ),
        });
      } else if (selectedPeriod === "month") {
        date.setMonth(date.getMonth() - (days - 1 - i));
        const monthStr = date.toISOString().slice(0, 7);

        // Count customers who made purchases in this month
        const monthSales = sales.filter((sale) => {
          const saleDate = new Date(sale.date || sale.created_at);
          return saleDate.toISOString().slice(0, 7) === monthStr;
        });
        const uniqueCustomers = [
          ...new Set(monthSales.map((sale) => sale.customer_id)),
        ].length;

        data.push({
          date: monthStr,
          customers: uniqueCustomers,
          orders: monthSales.length,
          sales: monthSales.reduce(
            (sum, sale) => sum + (sale.total_amount || 0),
            0
          ),
        });
      } else {
        date.setFullYear(date.getFullYear() - (days - 1 - i));
        const yearStr = date.getFullYear().toString();

        // Count customers who made purchases in this year
        const yearSales = sales.filter((sale) => {
          const saleDate = new Date(sale.date || sale.created_at);
          return saleDate.getFullYear().toString() === yearStr;
        });
        const uniqueCustomers = [
          ...new Set(yearSales.map((sale) => sale.customer_id)),
        ].length;

        data.push({
          date: yearStr,
          customers: uniqueCustomers,
          orders: yearSales.length,
          sales: yearSales.reduce(
            (sum, sale) => sum + (sale.total_amount || 0),
            0
          ),
        });
      }
    }
    return data;
  };

  const generateTopCustomersData = () => {
    const customerSales = {};
    sales.forEach((sale) => {
      if (sale.customer_id) {
        if (!customerSales[sale.customer_id]) {
          customerSales[sale.customer_id] = {
            customer_id: sale.customer_id,
            total_sales: 0,
            order_count: 0,
            customer_name:
              customers.find((c) => c.id == sale.customer_id)?.name ||
              `Customer #${sale.customer_id}`,
            customer_email:
              customers.find((c) => c.id == sale.customer_id)?.email || "N/A",
          };
        }
        customerSales[sale.customer_id].total_sales += sale.total_amount || 0;
        customerSales[sale.customer_id].order_count += 1;
      }
    });

    return Object.values(customerSales)
      .sort((a, b) => b.total_sales - a.total_sales)
      .slice(0, 10);
  };

  const generateCustomerLevelsData = () => {
    const levelStats = {};
    customers.forEach((customer) => {
      const levelName =
        customer.level?.name || customer.level?.level || "No Level";
      if (!levelStats[levelName]) {
        levelStats[levelName] = {
          level_name: levelName,
          customer_count: 0,
          total_sales: 0,
        };
      }
      levelStats[levelName].customer_count += 1;

      // Calculate sales for this customer
      const customerSales = sales.filter(
        (sale) => sale.customer_id == customer.id
      );
      const customerTotalSales = customerSales.reduce(
        (sum, sale) => sum + (sale.total_amount || 0),
        0
      );
      levelStats[levelName].total_sales += customerTotalSales;
    });

    return Object.values(levelStats);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FFC658",
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Customer Analytics
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-sm text-red-500">
            Please check your data and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <BreadCrumb
        currentPageTitle={"Customer Analysis Module"}
        links={[{ title: "Customer Module", path: "/dashboard/customers" }]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Customer Analysis
          </h1>
          <p className="text-gray-600">
            Comprehensive customer analytics and insights
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="day">Daily</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Customers
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatNumber(analyticsData?.total_customers || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">🛒</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Active Customers
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatNumber(analyticsData?.active_customers || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Avg Order Value
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(analyticsData?.average_order_value || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold">📈</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Retention Rate
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {(analyticsData?.customer_retention_rate || 0).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Customer Insights
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">New This Month</span>
              <span className="font-semibold">
                {formatNumber(analyticsData?.new_customers_this_month || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Sales</span>
              <span className="font-semibold">
                {formatCurrency(analyticsData?.total_sales || 0)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Customer
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Best Customer</p>
              <p className="font-semibold">
                {analyticsData?.top_customer || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="font-semibold text-green-600">
                {formatCurrency(analyticsData?.top_customer_sales || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Stats
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Period</span>
              <span className="font-semibold capitalize">{selectedPeriod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date Range</span>
              <span className="font-semibold text-sm">
                {startDate} to {endDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Activity Trend Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Customer Activity Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  name === "customers"
                    ? formatNumber(value)
                    : name === "sales"
                    ? formatCurrency(value)
                    : formatNumber(value),
                  name === "customers"
                    ? "Active Customers"
                    : name === "sales"
                    ? "Sales"
                    : "Orders",
                ]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="customers"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales vs Customers Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales vs Active Customers
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [
                  name === "sales"
                    ? formatCurrency(value)
                    : formatNumber(value),
                  name === "sales" ? "Sales" : "Active Customers",
                ]}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="customers"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer Level Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Customer Level Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerLevelsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ level_name, customer_count }) =>
                  `${level_name}: ${customer_count}`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="customer_count"
              >
                {customerLevelsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [formatNumber(value), "Customers"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales by Customer Level
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerLevelsData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                dataKey="level_name"
                type="category"
                width={120}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(value), "Sales"]}
              />
              <Bar dataKey="total_sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Customers Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Customers by Sales
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Order Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topCustomersData.map((customer, index) => (
                <tr key={customer.customer_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.customer_email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(customer.total_sales)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(customer.order_count)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {formatCurrency(
                      customer.total_sales / customer.order_count
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalysisPage;
