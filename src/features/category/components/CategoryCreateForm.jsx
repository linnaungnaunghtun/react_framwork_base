import { Link } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner.jsx";
import { useCreateCategory } from "../hooks/useCreateCategory.jsx";

const CategoryCreateForm = () => {
  const {
    createCategory,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    navigate,
  } = useCreateCategory();

  return (
    <div className="rounded-lg w-full ">
      <h1 className="text-3xl font-bold mb-3">Create New Category</h1>
      <p className="mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>
      <form onSubmit={handleSubmit(createCategory)}>
        <div className="w-full grid grid-cols-3 gap-x-5 gap-y-3">
          <div className=" col-span-1">
            {/* name */}
            <div className="mb-5">
              <label
                htmlFor="name"
                className={`block mb-2 text-sm font-medium ${
                  errors.name ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                New Category name <span className=" text-red-500">*</span>
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
                    "Category name is required"}
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
                {...register("back_to_category_list")}
                id="back-to-category-list"
                type="checkbox"
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor="back-to-category-list"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Back to Category List after saving
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
              <span>Save Category</span>
              {isSubmitting && <ButtonSpinner />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryCreateForm;
