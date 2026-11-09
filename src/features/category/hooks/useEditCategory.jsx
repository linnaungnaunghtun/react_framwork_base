import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import {
  categoryApiUrl,
  fetchCategory,
  updateCategory,
} from "../../../services/category";

import { useNavigate, useParams } from "react-router-dom";

const useEditCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { mutate } = useSWRConfig();

  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    `${categoryApiUrl}/${id}`,
    fetchCategory
  );

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleUpdateCategory = async (data) => {
    try {
      setIsSending(true);
      await updateCategory({
        id,
        title: data.name,
        name: data.name,
      });
      mutate(import.meta.env.VITE_API_URL + `/category/${id}`);
      toast.success("Category update successfully");
    } catch (error) {
      toast.error("An error occurred while updating the Category.");
      console.error("Error:", error);
    } finally {
      setIsSending(false);
      if (data.back_to_category_list) {
        navigate("/dashboard/categorys");
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isLoading,
    mutate,
    handleUpdateCategory,
    isSending,
    data,
    error,
    navigate,
  };
};

export default useEditCategory;
