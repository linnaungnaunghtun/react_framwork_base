import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { fetchCustomer, updateCustomer } from "../../../services/customer";
import { customerApiUrl } from "../../../services/customer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLevel, levelApiUrl } from "../../../services/level";

const useEditCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { mutate } = useSWRConfig();

  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    `${customerApiUrl}/${id}`,
    fetchCustomer
  );

  const { data: level, isLoading: levelLoading } = useSWR(
    levelApiUrl,
    fetchLevel
  );

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleUpdateCustomer = async (data) => {
    try {
      setIsSending(true);
      await updateCustomer({
        id,
        name: data.name,
        age: data.age,
        age_range: data.age_range,
        email: data.email,
        phone: data.phone,
        remark: data.remark,
        address: data.address,
        gender: data.gender,
        level_id: data.level_id,
        state: data.state,
        township: data.township,
      });
      mutate(import.meta.env.VITE_API_URL + `/customer/${id}`);
      toast.success("Customer update successfully");
    } catch (error) {
      toast.error("An error occurred while updating the customer.");
      console.error("Error:", error);
    } finally {
      setIsSending(false);
      if (data.back_to_customer_list) {
        navigate("/dashboard/customers");
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
    handleUpdateCustomer,
    isSending,
    level,
    levelLoading,
    data,
    error,
    navigate,
  };
};

export default useEditCustomer;
