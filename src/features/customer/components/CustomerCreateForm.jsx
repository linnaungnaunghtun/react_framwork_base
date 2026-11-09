import { Link } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner";
import { useCreateCustomer } from "../hooks/useCreateCustomer";

const CustomerCreateForm = () => {
  const {
    createCustomer,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    navigate,
    data,
    isLoading,
  } = useCreateCustomer();

  return (
    <div className="rounded-lg w-full">
      <h1 className="text-3xl font-bold mb-3">Create New Customer</h1>
      <p className="mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>
      <form onSubmit={handleSubmit(createCustomer)}>
        <div className=" grid grid-cols-3 gap-x-5 gap-y-3">
          <div className=" col-span-1">
            <div className="mb-3">
              <label
                htmlFor="name"
                className={`block mb-2 text-sm font-medium ${
                  errors.name ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                New Customer Name <span className=" text-red-500">*</span>
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
                    "Customer name is required"}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div className="mb-3 col-span-1">
                <label
                  htmlFor="age"
                  className={`block mb-2 text-sm font-medium ${
                    errors.age ? "text-red-500" : "text-gray-900"
                  } dark:text-white`}
                >
                  Age
                </label>
                <input
                  type="number"
                  {...register("age")}
                  className={`bg-gray-50 border ${
                    errors.age
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                />
              </div>

              <div className="mb-3 col-span-2">
                <label
                  htmlFor="age_range"
                  className={`block mb-2 text-sm font-medium ${
                    errors.age_range ? "text-red-500" : "text-gray-900"
                  } dark:text-white`}
                >
                  Age Range
                </label>
                <select
                  type="text"
                  {...register("age_range")}
                  className={`bg-gray-50 border ${
                    errors.age_range
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                >
                  <option value="">Choose Age Range</option>
                  <option value="young">Young</option>
                  <option value="middle">Middle</option>
                  <option value="old">Old</option>
                </select>
              </div>
            </div>

            <div className="">
              <label
                htmlFor="email"
                className={`block mb-2 text-sm font-medium ${
                  errors.email ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Customer Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`bg-gray-50 border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
            </div>
          </div>

          <div className=" col-span-1">
            <div className="mb-3">
              <label
                htmlFor="level_id"
                className={`block mb-2 text-sm font-medium ${
                  errors.level_id ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Customer Level <span className=" text-red-500">*</span>
              </label>
              <select
                type="number"
                {...register("level_id", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.level_id
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              >
                <option value="">Choose Customer Level</option>
                {isLoading ? (
                  <option>Loading...</option>
                ) : (
                  data?.data.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.level}
                    </option>
                  ))
                )}
              </select>

              {errors.level_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.level_id.type === "required" &&
                    "Customer level_id is required"}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="gender"
                className={`block mb-2 text-sm font-medium ${
                  errors.gender ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Gender
              </label>
              <select
                type="text"
                {...register("gender")}
                className={`bg-gray-50 border ${
                  errors.gender
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              >
                <option value="">Choose Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="">
              <label
                htmlFor="phone"
                className={`block mb-2 text-sm font-medium ${
                  errors.phone ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Customer Phone <span className=" text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("phone", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.type === "required" &&
                    "Customer phone is required"}
                </p>
              )}
            </div>
          </div>
          <div className=" col-span-1">
            <div className="">
              <label
                htmlFor="remark"
                className={`block mb-2 text-sm font-medium ${
                  errors.remark ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Remark
              </label>
              <textarea
                type="text"
                {...register("remark")}
                className={`bg-gray-50 border h-40  ${
                  errors.remark
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 col-span-2">
            <div className=" col-span-1">
              <label
                htmlFor="state"
                className={`block mb-2 text-sm font-medium ${
                  errors.state ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                State
              </label>
              <input
                type="text"
                {...register("state")}
                className={`bg-gray-50 border ${
                  errors.state
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="township"
                className={`block mb-2 text-sm font-medium ${
                  errors.township ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Township
              </label>
              <input
                type="text"
                {...register("township")}
                className={`bg-gray-50 border ${
                  errors.township
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
            </div>
          </div>
          <div className=" col-span-2">
            <div className="mb-3">
              <label
                htmlFor="address"
                className={`block mb-2 text-sm font-medium ${
                  errors.address ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Address
              </label>
              <input
                type="text"
                {...register("address")}
                className={`bg-gray-50 border ${
                  errors.address
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              />
            </div>
          </div>
          <div className=" col-span-full">
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
                {...register("back_to_customer_list")}
                id="back-to-Customer-list"
                type="checkbox"
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor="back-to-Customer-list"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Back to Customer List after saving
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
              <span>Save Customer</span>
              {isSubmitting && <ButtonSpinner />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerCreateForm;
