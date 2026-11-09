import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import {
  changeImage,
  changePassword,
  profileApiUrl,
} from "../../../services/profile";
import { useSWRConfig } from "swr";

const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();
  const { mutate } = useSWRConfig();

  const navigate = useNavigate();

  const [token, setToken] = useCookie("my_token");
  const [userCookie, setUserCookie] = useCookie("user");

  const handleChangePassword = async (data) => {
    try {
      const res = await changeImage(data);
      const json = await res.json();
      setIsSending(true);
      await changePassword({
        old_password: data.old_password,
        new_password: data.new_password,
        new_password_confirmation: data.new_password_confirmation,
      });

      if (res.status === 200) {
        toast.success(json.message);
        setToken(json.token);
        setUserCookie(JSON.stringify(json.user));
        mutate(`${profileApiUrl}/${data.id}`);
        navigate("/dashboard/user-profile");
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("An error occurred while changing the Password.");
      console.error("Error:", error);
    }
  };

  return {
    handleChangePassword,
    handleSubmit,
    register,
    isSubmitting,
    reset,
    errors,
  };
};

export default useChangePassword;
