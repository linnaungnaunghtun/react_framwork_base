import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import {
  supplierApiUrl,
  fetchSupplier,
  updateSupplier,
} from "../../../services/supplier";

import { useNavigate, useParams } from "react-router-dom";

const useEditSupplier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { mutate } = useSWRConfig();

  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    `${supplierApiUrl}/${id}`,
    fetchSupplier
  );

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleUpdateSupplier = async (data) => {
    try {
      setIsSending(true);
      await updateSupplier({
        id,
        name: data.name,
        contact: data.contact,
        address: data.address,
      });
      mutate(import.meta.env.VITE_API_URL + `/supplier/${id}`);
      toast.success("Supplier update successfully");
    } catch (error) {
      toast.error("An error occurred while updating the Supplier.");
      console.error("Error:", error);
    } finally {
      setIsSending(false);
      if (data.back_to_supplier_list) {
        navigate("/dashboard/suppliers");
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
    handleUpdateSupplier,
    isSending,
    data,
    error,
    navigate,
  };
};

export default useEditSupplier;
