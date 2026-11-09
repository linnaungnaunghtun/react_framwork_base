import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { storeCategory } from "../../../services/category";

export const useCreateCategory = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const createCategory = async (data) => {
    try {
      const res = await storeCategory({
        title: data.name,
        name: data.name,
      });
      const json = await res.json();

      if (res.status !== 201) {
        toast.error(json.message);
        return;
      }

      toast.success("Category created successfully");
      reset();

      if (data.back_to_category_list) {
        navigate("/dashboard/categorys");
      }
    } catch (error) {
      toast.error("An error occurred while creating the Category.");
      console.error("Error:", error);
    }
  };

  return {
    createCategory,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    navigate,
  };
};
