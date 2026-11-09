import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import {
  couponApiUrl,
  fetchCoupon,
  updateCoupon,
} from "../../../services/coupon";

import { useNavigate, useParams } from "react-router-dom";

const useEditCoupon = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { mutate } = useSWRConfig();

  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    `${couponApiUrl}/${id}`,
    fetchCoupon
  );

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleUpdateCoupon = async (data) => {
    try {
      setIsSending(true);
      await updateCoupon({
        id,
        title: data.title,
        code: data.code.toUpperCase().trim(),
        discount: data.discount,
        expire_date: data.expire_date,
      });
      mutate(import.meta.env.VITE_API_URL + `/coupon/${id}`);
      toast.success("Coupon update successfully");
    } catch (error) {
      toast.error("An error occurred while updating the Coupon.");
      console.error("Error:", error);
    } finally {
      setIsSending(false);
      if (data.back_to_coupon_list) {
        navigate("/dashboard/coupons");
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
    handleUpdateCoupon,
    isSending,
    data,
    error,
    navigate,
  };
};

export default useEditCoupon;
