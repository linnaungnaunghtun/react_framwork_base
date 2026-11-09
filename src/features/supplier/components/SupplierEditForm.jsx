import { Link } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner.jsx";
import useEditSupplier from "../hooks/useEditSupplier.jsx";

const SupplierEditForm = () => {
  const {
    register,
    handleSubmit,
    isSubmitting,
    isLoading,
    mutate,
    handleUpdateSupplier,
    isSending,
    data,
    errors,
    navigate,
  } = useEditSupplier();
  console.log(data);




  return (
    <div className="  rounded-lg w-full ">
      <h1 className=" text-3xl font-bold mb-3">Edit Supplier</h1>
      <p className=" mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>

      {!isLoading && (
        <form onSubmit={handleSubmit(handleUpdateSupplier)}>
          <div className=" grid grid-cols-3">
            <div className=" col-span-1">
              {/* name */}
              <div className=" mb-5">
                <label
                  htmlFor="name"
                  className={`block mb-2 text-sm font-medium ${
                    errors.name ? "text-red-500" : "text-gray-900"
                  } dark:text-white`}
                >
                  Supplier Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: true,
                  })}
                  defaultValue={data?.supplier?.name}
                  className={`bg-gray-50 border ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
                {errors.name?.type === "required" && (
                  <p className=" text-red-500 text-sm mt-1">
                    Supplier Name is required
                  </p>
                )}
              </div>

              {/*contact*/}
              <div className=" mb-5">
                <label
                  htmlFor="contact"
                  className={`block mb-2 text-sm font-medium ${
                    errors.contact ? "text-red-500" : "text-gray-900"
                  } dark:text-white`}
                >
                  Supplier Contact
                </label>
                <input
                  type="text"
                  {...register("contact", {
                    required: true,
                  })}
                  defaultValue={data?.supplier?.contact}
                  className={`bg-gray-50 border ${
                    errors.contact
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
                {errors.contact?.type === "required" && (
                  <p className=" text-red-500 text-sm mt-1">
                    Supplier Contact is required
                  </p>
                )}
              </div>

                {/*address*/}
              <div className=" mb-5">
                <label
                  htmlFor="address"
                  className={`block mb-2 text-sm font-medium ${
                    errors.address ? "text-red-500" : "text-gray-900"
                  } dark:text-white`}
                >
                  Supplier Address
                </label>
                <input
                  type="text"
                  {...register("address", {
                    required: true,
                  })}
                  defaultValue={data?.supplier?.address}
                  className={`bg-gray-50 border ${
                    errors.address
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
                {errors.address?.type === "required" && (
                  <p className=" text-red-500 text-sm mt-1">
                    Supplier Address is required
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
                  {...register("back_to_supplier_list")}
                  id="back-to-supplier-list"
                  type="checkbox"
                  value=""
                  checked
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="back-to-supplier-list"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Back to Supplier List after saving
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
                <span>Update Supplier</span>
                {isSubmitting && <ButtonSpinner />}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SupplierEditForm;
