import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import { changeImage, profileApiUrl } from "../../../services/profile";
import { useSWRConfig } from "swr";

const useChangeImage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();
  const { mutate } = useSWRConfig();

  const navigate = useNavigate();

  const [token, setToken] = useCookie("my_token");
  const [userCookie, setUserCookie] = useCookie("user");

  const handleChangeImage = async (data) => {
    try {
      const res = await changeImage(data);
      const json = await res.json();

      if (res.status === 200) {
        toast.success("Image Changed Successfully");
        setToken(json.token);
        setUserCookie(JSON.stringify(json.user));

        mutate(`${profileApiUrl}/${data.profile_image}`);
        
        navigate("/dashboard/user-profile");
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("An error occurred while changing the Image.");
      console.error("Error:", error);
    }
  };

  return {
    handleChangeImage,
    handleSubmit,
    register,
    isSubmitting,
    reset,
    errors,
    setValue,
  };
};

export default useChangeImage;
