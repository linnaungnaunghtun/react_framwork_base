import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { storeCoupon } from "../../../services/coupon";

export const useCreateCoupon = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const createCoupon = async (data) => {
    try {
      const res = await storeCoupon({
        title : data.title,
        code : data.code.toUpperCase().trim(),
        discount : data.discount,
        expire_date : data.expire_date
      });
      const json = await res.json();

      if (res.status !== 200) {
        toast.error(json.message);
        return;
      }

      toast.success("Coupon created successfully");
      reset();

      if (data.back_to_coupon_list) {
        navigate("/dashboard/coupons");
      }
    } catch (error) {
      toast.error("An error occurred while creating the Coupon.");
      console.error("Error:", error);
    }
  };

  return { createCoupon, register, handleSubmit, isSubmitting, errors, navigate };
};
