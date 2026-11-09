import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { storeLevel } from "../../../services/level";

export const useCreateLevel = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const createLevel = async (data) => {
    try {
      const res = await storeLevel({
        level: data.level,
        discount: data.discount,
      });
      const json = await res.json();

      if (res.status !== 200) {
        toast.error(json.message);
        return;
      }

      toast.success("Level created successfully");
      reset();

      if (data.back_to_level_list) {
        navigate("/dashboard/levels");
      }
    } catch (error) {
      toast.error("An error occurred while creating the level.");
      console.error("Error:", error);
    }
  };

  return { createLevel, register, handleSubmit, isSubmitting, errors, navigate };
};
