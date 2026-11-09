import useCookie from "react-use-cookie";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../../../stores/useUserStore";
import { changeImage } from "../../../services/profile";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner";
import ProfileImageUploadInput from "./ProfileImageUploadInput";
import { galleryApiUrl } from "../../../services/gallery";
import useChangeImage from "../hooks/useChangeImage";

const ProfileImageChange = () => {
  const navigate = useNavigate();
  const [userCookie, setUserCookie] = useCookie("user");
  const { name, email, profile_image } = JSON.parse(userCookie);

  const { register, handleSubmit, isSubmitting, errors, reset, setValue } =
    useChangeImage();

  const [token] = useCookie("my_token");

  const { user, setUser } = useUserStore();

  const handleUpdateImage = async (data) => {
    const res = await changeImage(data);

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
  };

  return (
    <div className="rounded-lg w-full">
      <h1 className="text-3xl font-bold mb-3">Change User Image</h1>
      <p className="mb-10 text-stone-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
        necessitatibus quos earum itaque.
      </p>
      <form onSubmit={handleSubmit(handleUpdateImage)}>
        <div className=" grid grid-cols-3">
          <div className=" col-span-1">
            <div className="mb-5">
              <label
                htmlFor="profile_image"
                className={`block mb-2 text-sm font-medium ${
                  errors.profile_image ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Change Image <span className=" text-red-500">*</span>
              </label>

              <ProfileImageUploadInput
                inputName="profile_image"
                register={register}
                setValue={setValue}
                required={true}
                uploadUrl={galleryApiUrl}
                defaultValue={profile_image}
                errors={errors}
              />

              {errors.profile_image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profile_image.type === "required" &&
                    "Profile image is required"}
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
              <span>Change Image</span>
              {isSubmitting && <ButtonSpinner />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileImageChange;
