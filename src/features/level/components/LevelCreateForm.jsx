import { Link } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner";
import { useCreateLevel } from "../hooks/useCreateLevel";

const LevelCreateForm = () => {
  const {
    createLevel,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    navigate,
  } = useCreateLevel();

  return (
    <div className="rounded-lg w-full ">
      <h1 className="text-3xl font-bold mb-3">Create New Level</h1>
      <p className="mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>
      <form onSubmit={handleSubmit(createLevel)}>
      <div className="w-full grid grid-cols-3 gap-x-5 gap-y-3">
      <div className=" col-span-1">
        <div className="mb-5">
          <label
            htmlFor="level_name"
            className={`block mb-2 text-sm font-medium ${
              errors.level ? "text-red-500" : "text-gray-900"
            } dark:text-white`}
          >
            New Level Name <span className=" text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("level", {
              required: true,
            })}
            className={`bg-gray-50 border ${
              errors.level
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          />
          {errors.level && (
            <p className="text-red-500 text-sm mt-1">
              {errors.level.type === "required" &&
                "Level name is required"}
            </p>
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="discount"
            className={`block mb-2 text-sm font-medium text-gray-900 ${
              errors.discount ? "text-red-500" : "text-gray-900"
            } dark:text-white`}
          >
            Level Discount <span className=" text-red-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            {...register("discount", {
              required: true,
              validte_as_number: true,
            })}
  
            
            className={`bg-gray-50 border ${
              errors.discount
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          />
          {errors.discount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.discount.type === "required" && "Level discount is required"}
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
            {...register("back_to_level_list")}
            id="back-to-Level-list"
            type="checkbox"
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
          />
          <label
            htmlFor="back-to-Level-list"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Back to Level List after saving
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
          <span>Save Level</span>
          {isSubmitting && <ButtonSpinner />}
        </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default LevelCreateForm;
