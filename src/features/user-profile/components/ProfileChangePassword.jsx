import useCookie, { removeCookie } from "react-use-cookie";
import toast from "react-hot-toast";
import useUserStore from "../../../stores/useUserStore";
import { changePassword } from "../../../services/profile";
import { useNavigate } from "react-router-dom";
import useChangePassword from "../hooks/useChangePassword";
import ButtonSpinner from "../../../components/ButtonSpinner";

const ProfileChangePassword = () => {
  const navigate = useNavigate();
  const [userCookie, setUserCookie] = useCookie("user");
  const { name, email, profile_image } = JSON.parse(userCookie);

  const { register, handleSubmit, isSubmitting, errors, reset } =
    useChangePassword();
  const [token] = useCookie("my_token");

  const { user, setUser } = useUserStore();

  const handleUpdatePassword = async (data) => {
    const res = await changePassword(data);
    const json = await res.json();
    if (res.status === 200) {
      toast.success(json.message);
      reset();
      removeCookie("my_token");
      removeCookie("user");
      navigate("/login");
    } else {
      toast.error(json.message);
    }
  };

  return (
    <div className="rounded-lg w-full">
      <h1 className="text-3xl font-bold mb-3">Change User Password</h1>
      <p className="mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>
      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <div className=" grid grid-cols-3">
          <div className=" col-span-1">
            <div className="mb-5">
              <label
                htmlFor="first_name"
                className={`block mb-2 text-sm font-medium ${
                  errors.old_password ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Old Password <span className=" text-red-500">*</span>
              </label>

              <input
                type="password"
                id="password"
                placeholder="••••••••"
                {...register("old_password", {
                  required: true,
                })}
                className={`bg-gray-50 w-[300px] border ${
                  errors.old_password
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              />
              {errors.old_password?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  Old Password is required
                </p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="first_name"
                className={`block mb-2 text-sm font-medium ${
                  errors.new_password ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                New Password <span className=" text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                {...register("new_password", {
                  required: true,
                })}
                className={`bg-gray-50 w-[300px] border ${
                  errors.new_password
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              />
              {errors.new_password?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  New Password is required
                </p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="first_name"
                className={`block mb-2 text-sm font-medium ${
                  errors.new_password_confirmation
                    ? "text-red-500"
                    : "text-gray-900"
                } dark:text-white`}
              >
                Comfirm Password
                <span className=" text-red-500">*</span>
              </label>
              <input
                id="password"
                placeholder="••••••••"
                type="password"
                {...register("new_password_confirmation", {
                  required: true,
                })}
                className={`bg-gray-50 w-[300px] border ${
                  errors.new_password_confirmation
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              />
              {errors.new_password_confirmation?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  Comfirm Password is required
                </p>
              )}
            </div>
            <div className=" col-span-full">
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
            </div>

            <button
              type="button"
              onClick={() => navigate("/dashboard/user-profile")}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-primary-400 disabled:pointer-events-none disabled:opacity-80 inline-flex items-center justify-center gap-3 hover:bg-primary-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
            >
              <span>Change Password</span>
              {isSubmitting && <ButtonSpinner />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileChangePassword;
