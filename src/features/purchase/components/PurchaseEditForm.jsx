import { Link } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner.jsx";
import useEditPurchase from "../hooks/useEditPurchase.jsx";

const PurchaseEditForm = () => {
  const {
    register,
    handleSubmit,
    isSubmitting,
    isLoading,
    mutate,
    handleUpdatePurchase,
    isSending,
    data,
    errors,
    navigate,
  } = useEditPurchase();

  return (
    <div className="  rounded-lg w-full ">
      <h1 className=" text-3xl font-bold mb-3">Edit Purchase</h1>
      <p className=" mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>

      {!isLoading && (
        <form onSubmit={handleSubmit(handleUpdatePurchase)}>
          <div className=" grid grid-cols-3">
            <div className=" col-span-1">
              {/* title */}
              <div className=" mb-5">
                <label
                  htmlFor="title"
                  className={`block mb-2 text-sm font-medium ${
                    errors.title ? "text-red-500" : "text-gray-900"
                  } dark:text-white`}
                >
                  Purchase Title
                </label>
                <input
                  type="text"
                  {...register("title", {
                    required: true,
                  })}
                  defaultValue={data?.data?.title}
                  className={`bg-gray-50 border ${
                    errors.title
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
                {errors.title?.type === "required" && (
                  <p className=" text-red-500 text-sm mt-1">
                    Purchase Title is required
                  </p>
                )}
              </div>

              {/*code*/}
              <div className=" mb-5">
                <label
                  htmlFor="code"
                  className={`block mb-2 text-sm font-medium ${
                    errors.code ? "text-red-500" : "text-gray-900"
                  } dark:text-white`}
                >
                  Purchase Code
                </label>
                <input
                  type="text"
                  {...register("code", {
                    required: true,
                  })}
                  defaultValue={data?.data?.code}
                  className={`bg-gray-50 border ${
                    errors.code
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
                {errors.code?.type === "required" && (
                  <p className=" text-red-500 text-sm mt-1">
                    Purchase Code is required
                  </p>
                )}
              </div>

              {/*discount*/}
              <div className=" mb-5">
                <label
                  htmlFor="discount"
                  className={`block mb-2 text-sm font-medium ${
                    errors.discount ? "text-red-500" : "text-gray-900"
                  } dark:text-white`}
                >
                  Discount Percentage
                </label>
                <input
                  type="number"
                  min={0}
                  {...register("discount", {
                    required: true,
                  })}
                  defaultValue={data?.data?.discount}
                  className={`bg-gray-50 border ${
                    errors.discount
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
                {errors.discount?.type === "required" && (
                  <p className=" text-red-500 text-sm mt-1">
                    Discount is required
                  </p>
                )}
              </div>

              {/*discount*/}
              <div className=" mb-5">
                <label
                  htmlFor="expire_date"
                  className={`block mb-2 text-sm font-medium ${
                    errors.expire_date ? "text-red-500" : "text-gray-900"
                  } dark:text-white`}
                >
                  Expire Date
                </label>
                <input
                  type="date"
                  {...register("expire_date", {
                    required: true,
                  })}
                  defaultValue={data?.data?.expire_date}
                  className={`bg-gray-50 border ${
                    errors.expire_date
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
                {errors.expire_date?.type === "required" && (
                  <p className=" text-red-500 text-sm mt-1">
                    Expire Date is required
                  </p>
                )}
              </div>

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
                  {...register("back_to_purchase_list")}
                  id="back-to-purchase-list"
                  type="checkbox"
                  value=""
                  checked
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="back-to-purchase-list"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Back to Purchase List after saving
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
                <span>Update Purchase</span>
                {isSubmitting && <ButtonSpinner />}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PurchaseEditForm;
