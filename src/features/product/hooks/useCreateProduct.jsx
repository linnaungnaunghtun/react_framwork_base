import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { storeProduct } from "../../../services/product";
import useSWR from "swr";
import { categoryApiUrl, fetchCategory } from "../../../services/category";

export const useCreateProduct = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

 
  const { data, isLoading, error } = useSWR(
    `${categoryApiUrl}`,
    fetchCategory
  );


  const createProduct = async (data) => {
    try {
      const res = await storeProduct({
        name : data.name,
        code : data.code.toUpperCase().trim(),
        cost_price : data.cost_price,
        sell_price : data.sell_price,
        stock : data.stock,
        threshold : data.threshold,
        category_id : data.category_id,
      });
      const json = await res.json();

      if (res.status !== 201) {
        toast.error(json.message);
        return;
      }

      toast.success("Product created successfully");
      reset();

      if (data.back_to_product_list) {
        navigate("/dashboard/products");
      }
    } catch (error) {
      toast.error("An error occurred while creating the Product.");
      console.error("Error:", error);
    }
  };

  return { createProduct, register, handleSubmit, isSubmitting, errors, navigate, data, isLoading, error };
};
