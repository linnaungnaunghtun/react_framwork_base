import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { fetchLevel, updateLevel } from "../../../services/level";
import { levelApiUrl } from "../../../services/level";
import { useNavigate, useParams } from "react-router-dom";

const useEditLevel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { mutate } = useSWRConfig();

  const { id } = useParams();

  const { data, isLoading, error } = useSWR(`${levelApiUrl}/${id}`, fetchLevel);

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleUpdateLevel = async (data) => {
    try {
      setIsSending(true);
      await updateLevel({
        id,
        level: data.level,
        discount: data.discount,
       
      });
      mutate(import.meta.env.VITE_API_URL + `/level/${id}`);
      toast.success("Level update successfully");
    } catch (error) {
      toast.error("An error occurred while updating the level.");
      console.error("Error:", error);
    } finally {
      setIsSending(false);
      if (data.back_to_level_list) {
        navigate("/dashboard/levels");
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
    handleUpdateLevel,
    isSending,
    data,
    error,
    navigate
  };
};

export default useEditLevel;
