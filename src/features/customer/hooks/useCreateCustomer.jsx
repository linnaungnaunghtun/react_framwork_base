import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { storeCustomer } from "../../../services/customer";
import useSWR from "swr";
import { fetchLevel, levelApiUrl } from "../../../services/level";

export const useCreateCustomer = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const { data, isLoading } = useSWR(levelApiUrl, fetchLevel);

  const createCustomer = async (data) => {
    try {
      const res = await storeCustomer({
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
      const json = await res.json();

      if (res.status !== 200) {
        toast.error(json.message);
        return;
      }

      toast.success("Customer created successfully");
      reset();

      if (data.back_to_customer_list) {
        navigate("/dashboard/customers");
      }
    } catch (error) {
      toast.error("An error occurred while creating the customer.");
      console.error("Error:", error);
    }
  };

  return {
    createCustomer,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    navigate,
    data,
    isLoading,
  };
};
