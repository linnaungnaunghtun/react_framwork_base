import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import { changeName, profileApiUrl } from "../../../services/profile";
import { useSWRConfig } from "swr";

const useChangeName = () => {
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

  const handleName = async (data) => {
    try {
      const res = await changeName(data);
      const json = await res.json();

      if (res.status === 200) {
        toast.success("Name Changed Successfully");
        setToken(json.token);
        setUserCookie(JSON.stringify(json.user));
        mutate(`${profileApiUrl}/${data.name}`);
        navigate("/dashboard/user-profile");
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("An error occurred while changing the name.");
      console.error("Error:", error);
    }
  };

  return {
    handleName,
    handleSubmit,
    register,
    isSubmitting,
    reset,
    errors,
  };
};

export default useChangeName;
