import { Link } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner";
import { useCreateCoupon } from "../hooks/useCreateCoupon.jsx";

const CouponCreateForm = () => {
  const {
    createCoupon,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    navigate,
  } = useCreateCoupon();

  return (
    <div className="rounded-lg w-full ">
      <h1 className="text-3xl font-bold mb-3">Create New Coupon</h1>
      <p className="mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>
      <form onSubmit={handleSubmit(createCoupon)}>
      <div className="w-full grid grid-cols-3 gap-x-5 gap-y-3">
      <div className=" col-span-1">
        {/* title */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className={`block mb-2 text-sm font-medium ${
              errors.title ? "text-red-500" : "text-gray-900"
            } dark:text-white`}
          >
            New Coupon Title <span className=" text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("title", {
              required: true,
            })}
            className={`bg-gray-50 border ${
              errors.title
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.type === "required" &&
                "Coupon title is required"}
            </p>
          )}
        </div>

        {/* code */}
        <div className="mb-5">
          <label
              htmlFor="code"
              className={`block mb-2 text-sm font-medium ${
                  errors.code ? "text-red-500" : "text-gray-900"
              } dark:text-white`}
          >
           Coupon Code <span className=" text-red-500">*</span>
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
                    "Coupon code is required"}
              </p>
          )}
        </div>

        {/* discount */}
        <div className="mb-5">
          <label
              htmlFor="discount"
              className={`block mb-2 text-sm font-medium ${
                  errors.discount ? "text-red-500" : "text-gray-900"
              } dark:text-white`}
          >
            Discount Percentage <span className=" text-red-500">*</span>
          </label>
          <input
              type="number"
              min={0}
              {...register("discount", {
                required: true,
              })}
              className={`bg-gray-50 border ${
                  errors.discount
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          />
          {errors.discount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discount.type === "required" &&
                    "Coupon discount is required"}
              </p>
          )}
        </div>

        {/* expire date */}
        <div className="mb-5">
          <label
              htmlFor="expire_date"
              className={`block mb-2 text-sm font-medium ${
                  errors.expire_date ? "text-red-500" : "text-gray-900"
              } dark:text-white`}
          >
            Expire Date <span className=" text-red-500">*</span>
          </label>
          <input
              type="date"
              {...register("expire_date", {
                required: true,
              })}
              className={`bg-gray-50 border ${
                  errors.expire_date
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          />
          {errors.expire_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expire_date.type === "required" &&
                    "Coupon discount is required"}
              </p>
          )}
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
            {...register("back_to_coupon_list")}
            id="back-to-coupon-list"
            type="checkbox"
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
          />
          <label
            htmlFor="back-to-coupon-list"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Back to Coupon List after saving
          </label>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="text-white bg-primary-400 disabled:pointer-events-none disabled:opacity-80 inline-flex items-center justify-center gap-3 hover:bg-primary-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
        >
          <span>Save Coupon</span>
          {isSubmitting && <ButtonSpinner />}
        </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default CouponCreateForm;
