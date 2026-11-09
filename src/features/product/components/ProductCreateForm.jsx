import { Link } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner.jsx";
import { useCreateProduct } from "../hooks/useCreateProduct.jsx";

const ProductCreateForm = () => {
  const {
    createProduct,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    navigate,
    data,
    isLoading,
    error,
  } = useCreateProduct();

  return (
    <div className="rounded-lg w-full ">
      <h1 className="text-3xl font-bold mb-3">Create New Product</h1>
      <p className="mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>
      <form onSubmit={handleSubmit(createProduct)}>
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-5">
            {/* name */}
            <div className="flex-1">
              <label
                htmlFor="name"
                className={`block mb-2 text-sm font-medium ${
                  errors.name ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                New Product Title <span className=" text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.type === "required" &&
                    "Product name is required"}
                </p>
              )}
            </div>

            {/* code */}
            <div className="flex-1">
              <label
                htmlFor="code"
                className={`block mb-2 text-sm font-medium ${
                  errors.code ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Product Code <span className=" text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("code", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.code
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
              {errors.code && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.code.type === "required" &&
                    "Product code is required"}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            {/* cost_price */}
            <div className="flex-1">
              <label
                htmlFor="cost_price"
                className={`block mb-2 text-sm font-medium ${
                  errors.cost_price ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Cost Price <span className=" text-red-500">*</span>
              </label>
              <input
                type="number"
                min={0}
                {...register("cost_price", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.cost_price
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
              {errors.cost_price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cost_price.type === "required" &&
                    "Product cost_price is requiredd"}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="sell_price"
                className={`block mb-2 text-sm font-medium ${
                  errors.sell_price ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Sell Price <span className=" text-red-500">*</span>
              </label>
              <input
                type="number"
                min={0}
                {...register("sell_price", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.sell_price
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
              {errors.sell_price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sell_price.type === "required" &&
                    "Product sell_price is required"}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <label
                htmlFor="stock"
                className={`block mb-2 text-sm font-medium ${
                  errors.stock ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Stock <span className=" text-red-500">*</span>
              </label>
              <input
                type="number"
                min={0}
                {...register("stock", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.stock
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.type === "required" &&
                    "Product stock is required"}
                </p>
              )}
            </div>

            {/* threshold */}
            <div className="flex-1">
              <label
                htmlFor="threshold"
                className={`block mb-2 text-sm font-medium ${
                  errors.threshold ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Threshold Price <span className=" text-red-500">*</span>
              </label>
              <input
                type="number"
                min={0}
                {...register("threshold", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.threshold
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
              {errors.threshold && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.threshold.type === "required" &&
                    "Product threshold is required"}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            {/* category */}
            <div className="flex-1">
              <label
                htmlFor="category_id"
                className={`block mb-2 text-sm font-medium ${
                  errors.category_id ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Category <span className=" text-red-500">*</span>
              </label>
              <select
                {...register("category_id", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.category_id
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              >
                <option value="">Choose Category</option>
                {isLoading ? (
                  <option>Loading...</option>
                ) : (
                  data?.data.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>

              {errors.category_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category_id.type === "required" &&
                    "Category is required"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              {...register("all_correct")}
              required
              id="all-correct"
              type="checkbox"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
            />
            <label
              htmlFor="all-correct"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Make sure all fields are correct
            </label>
          </div>

          <div className="flex items-center mb-4">
            <input
              {...register("back_to_product_list")}
              id="back-to-product-list"
              type="checkbox"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
            />
            <label
              htmlFor="back-to-product-list"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Back to Product List after saving
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-primary-400 disabled:pointer-events-none disabled:opacity-80 inline-flex items-center justify-center gap-3 hover:bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              <span>Save Product</span>
              {isSubmitting && <ButtonSpinner />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductCreateForm;
