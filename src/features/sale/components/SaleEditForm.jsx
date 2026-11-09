import { Link } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner";
import useEditSale from "../hooks/useEditSale";
import { useEffect } from "react";

const SaleEditForm = () => {
  const {
    data,
    isLoading,
    error,
    register,
    handleSubmit,
    errors,
    updateSaleData,
    setValue,
    watch,
    customers,
  } = useEditSale();

  useEffect(() => {
    if (data?.sale) {
      setValue("user_id", data.sale.user_id);
      setValue("customer_id", data.sale.customer_id);
      setValue("total_amount", data.sale.total_amount);
      setValue("date", data.sale.date);
    }
  }, [data, setValue]);

  if (isLoading) {
    return <ButtonSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading sale: {error.message}</p>
      </div>
    );
  }

  if (!data?.sale) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Sale not found</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg w-full">
      <h1 className="text-3xl font-bold mb-3">Edit Sale</h1>
      <p className="mb-10 text-stone-500">
        Update the sale information and details.
      </p>

      <form onSubmit={handleSubmit(updateSaleData)}>
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-5">
            {/* User ID */}
            <div className="flex-1">
              <label
                htmlFor="user_id"
                className={`block mb-2 text-sm font-medium ${
                  errors.user_id ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                User ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("user_id", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.user_id
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
              {errors.user_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user_id.type === "required" && "User ID is required"}
                </p>
              )}
            </div>

            {/* Customer ID */}
            <div className="flex-1">
              <label
                htmlFor="customer_id"
                className={`block mb-2 text-sm font-medium ${
                  errors.customer_id ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Customer ID <span className="text-red-500">*</span>
              </label>
              <select
                {...register("customer_id", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.customer_id
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              >
                <option value="">Choose Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} - {customer.email}
                  </option>
                ))}
              </select>
              {errors.customer_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customer_id.type === "required" &&
                    "Customer is required"}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            {/* Total Amount */}
            <div className="flex-1">
              <label
                htmlFor="total_amount"
                className={`block mb-2 text-sm font-medium ${
                  errors.total_amount ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Total Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register("total_amount", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.total_amount
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
              {errors.total_amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.total_amount.type === "required" &&
                    "Total amount is required"}
                </p>
              )}
            </div>

            {/* Date */}
            <div className="flex-1">
              <label
                htmlFor="date"
                className={`block mb-2 text-sm font-medium ${
                  errors.date ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Sale Date <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                {...register("date", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.date
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.type === "required" && "Sale date is required"}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6">
            <Link
              to="/dashboard/sales"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Sale
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SaleEditForm;
