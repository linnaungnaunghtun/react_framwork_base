import useCookie from "react-use-cookie";
import toast from "react-hot-toast";
import useUserStore from "../../../stores/useUserStore";
import { changeName } from "../../../services/profile";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner";
import useChangeName from "../hooks/useChangeName";


const ProfileNameChangeCard = () => {
  const [userCookie, setUserCookie] = useCookie("user");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    reset,
  } = useChangeName();
  

  const [token] = useCookie("my_token");

  const { user, setUser } = useUserStore();

  const handleUpdateName = async (data) => {
    const res = await changeName(data);

    const json = await res.json();

    if (res.status === 200) {
      toast.success(json.message);
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
      reset();
      navigate("/dashboard/user-profile");
    } else {
      toast.error(json.message);
    }
  };
  const handleCancel = () => { 
    navigate("/dashboard/user-profile");
  } 
  
  return (
    <div className="rounded-lg w-full">
      <h1 className="text-3xl font-bold mb-3">Change User Name</h1>
      <p className="mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>

      <form onSubmit={handleSubmit(handleUpdateName)}>
        <div className="w-full grid grid-cols-3 gap-x-5 gap-y-3">
          <div className=" col-span-1">
            <div className="mb-5 ">
              <label
                htmlFor="first_name"
                className={`block mb-2 text-sm font-medium ${
                  errors.name ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Update Your Name <span className=" text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: true,
                })}
                className={`bg-gray-50 w-[300px] border ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              />
              {errors.name?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  Your name is required
                </p>
              )}
            </div>
            <div className=" col-span-full">
              <div className="flex items-center mb-4 ">
                <input
                  {...register("all_correct")}
                  required
                  id="all-correct"
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                />
                <label
                  htmlFor="all-correct"
                  className="ml-2 text-sm cursor-pointer font-medium text-gray-900"
                >
                  Make sure all fields are correct
                </label>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCancel}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-primary-400 disabled:pointer-events-none disabled:opacity-80 inline-flex items-center justify-center gap-3 hover:bg-primary-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
            >
              <span>Change Name</span>
              {isSubmitting && <ButtonSpinner />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileNameChangeCard;
