import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import {
  purchaseApiUrl,
  fetchPurchase,
  updatePurchase,
} from "../../../services/purchase";

import { useNavigate, useParams } from "react-router-dom";

const useEditPurchase = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { mutate } = useSWRConfig();

  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    `${purchaseApiUrl}/${id}`,
    fetchPurchase
  );

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleUpdatePurchase = async (data) => {
    try {
      setIsSending(true);
      await updatePurchase({
        id,
        title: data.title,
        code: data.code.toUpperCase().trim(),
        discount: data.discount,
        expire_date: data.expire_date,
      });
      mutate(import.meta.env.VITE_API_URL + `/purchase/${id}`);
      toast.success("Purchase update successfully");
    } catch (error) {
      toast.error("An error occurred while updating the Purchase.");
      console.error("Error:", error);
    } finally {
      setIsSending(false);
      if (data.back_to_purchase_list) {
        navigate("/dashboard/purchases");
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
    handleUpdatePurchase,
    isSending,
    data,
    error,
    navigate,
  };
};

export default useEditPurchase;
