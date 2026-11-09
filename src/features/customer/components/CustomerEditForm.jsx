import { Link } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner";
import useEditCustomer from "../hooks/useEditCustomer";

const CustomerEditForm = () => {
  const {
    register,
    handleSubmit,
    isSubmitting,
    isLoading,
    handleUpdateCustomer,
    data,
    errors,
    navigate,
    level,
    levelLoading,
  } = useEditCustomer();

  return (
    <div className="  rounded-lg w-full">
      <h1 className=" text-3xl font-bold mb-3">Edit Customer</h1>
      <p className=" mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>

      {!isLoading && (
        <form onSubmit={handleSubmit(handleUpdateCustomer)}>
          <div className="grid grid-cols-3 gap-x-5 gap-y-3">
            <div className="col-span-1">
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
                  defaultValue={data?.data?.name}
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
                    defaultValue={data?.data?.age}
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
                    defaultValue={data?.data?.age_range}
                    className={`bg-gray-50 border ${
                      errors.age_range
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                  >
                    <option value="young">Young</option>
                    <option value="middle">Middle</option>
                    <option value="old">Old</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
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
                  defaultValue={data?.data?.email}
                  className={`bg-gray-50 border ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                />
              </div>
              <div className="">
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
                  defaultValue={data?.data?.state}
                  {...register("state")}
                  className={`bg-gray-50 border ${
                    errors.state
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-3">
                <label
                  htmlFor="level_id"
                  className={`block mb-2 text-sm font-medium ${
                    errors.level_id ? "text-red-500" : "text-gray-900"
                  } dark:text-white`}
                >
                  Customer Level <span className=" text-red-500">*</span>
                </label>
                {!levelLoading && (
                  <select
                    type="text"
                    {...register("level_id", {
                      required: true,
                    })}
                    defaultValue={data?.data?.level.id}
                    className={`bg-gray-50 border ${
                      errors.level_id
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  >
                    {level?.data?.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.level}
                      </option>
                    ))}
                  </select>
                )}
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
                  defaultValue={data?.data?.gender}
                  className={`bg-gray-50 border ${
                    errors.gender
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="phone"
                  className={`block mb-2 text-sm font-medium ${
                    errors.phone ? "text-red-500" : "text-gray-900"
                  } dark:text-white`}
                >
                  Customer Phone <span className=" text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("phone", {
                    required: true,
                  })}
                  defaultValue={data?.data?.phone}
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
              <div className="">
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
                  defaultValue={data?.data?.township}
                  className={`bg-gray-50 border ${
                    errors.township
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                />
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
                  defaultValue={data?.data?.remark}
                  {...register("remark")}
                  className={`bg-gray-50 border h-40 ${
                    errors.remark
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                />
              </div>
            </div>
            {/* <div className="col-span-2"></div> */}
            <div className="col-span-2">
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
                  defaultValue={data?.data?.address}
                  className={`bg-gray-50 border ${
                    errors.address
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                />
              </div>
            </div>
            <div className="col-span-full">
              <div className="flex items-center mb-4">
                <input
                  {...register("all_correct")}
                  required
                  id="all-correct"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="all-correct"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Make sure all field are correct
                </label>
              </div>

              <div className="flex items-center mb-4">
                <input
                  {...register("back_to_customer_list")}
                  id="back-to-customer-list"
                  type="checkbox"
                  value=""
                  checked
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="back-to-customer-list"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Back to Customer List after saving
                </label>
              </div>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-primary-400 inline-flex gap-3 items-center justify-center disabled:pointer-events-none disabled:opacity-80 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-400 dark:hover:bg-primary-500 dark:focus:ring-primary-600"
              >
                <span>Update Customer</span>
                {isSubmitting && <ButtonSpinner />}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CustomerEditForm;
