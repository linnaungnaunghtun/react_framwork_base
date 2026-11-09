import { Link } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner.jsx";
import useEditCategory from "../hooks/useEditCategory.jsx";

const CategoryEditForm = () => {
  const {
    register,
    handleSubmit,
    isSubmitting,
    isLoading,
    mutate,
    handleUpdateCategory,
    isSending,
    data,
    errors,
    navigate,
  } = useEditCategory();

  return (
    <div className="  rounded-lg w-full ">
      <h1 className=" text-3xl font-bold mb-3">Edit Category</h1>
      <p className=" mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>

      {!isLoading && (
        <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
                  Category name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: true,
                  })}
                  defaultValue={data?.category?.name}
                  className={`bg-gray-50 border ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                />
                {errors.name?.type === "required" && (
                  <p className=" text-red-500 text-sm mt-1">
                    Category name is required
                  </p>
                )}
              </div>

              <div className="flex items-center mb-4">
                <input
                  {...register("back_to_category_list")}
                  id="back-to-category-list"
                  type="checkbox"
                  value=""
                  checked
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="back-to-category-list"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Back to Category List after saving
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
                <span>Update Category</span>
                {isSubmitting && <ButtonSpinner />}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CategoryEditForm;
