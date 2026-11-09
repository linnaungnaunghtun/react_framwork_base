import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useSWR from "swr";
import { fetchSaleDetails, updateSale } from "../../../services/sale";
import { customerApiUrl, fetchCustomer } from "../../../services/customer";

const useEditSale = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { data, isLoading, error } = useSWR(id ? `/sale/${id}` : null, () =>
    fetchSaleDetails(id)
  );

  const { data: customersData, isLoading: customersLoading } = useSWR(
    `${customerApiUrl}`,
    fetchCustomer
  );

  const updateSaleData = async (formData) => {
    try {
      const res = await updateSale({
        id: id,
        user_id: formData.user_id,
        customer_id: formData.customer_id,
        total_amount: formData.total_amount,
        date: formData.date,
      });
      const json = await res.json();

      if (res.status !== 200) {
        toast.error(json.message);
        return;
      }

      toast.success("Sale updated successfully");
      navigate("/dashboard/sales");
    } catch (error) {
      toast.error("An error occurred while updating the sale.");
      console.error("Error:", error);
    }
  };

  return {
    data,
    isLoading: isLoading || customersLoading,
    error,
    register,
    handleSubmit,
    errors,
    updateSaleData,
    setValue,
    watch,
    customers: customersData?.data || [],
  };
};

export default useEditSale;
