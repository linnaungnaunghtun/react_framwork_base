import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import {
  productApiUrl,
  fetchProduct,
  updateProduct,
} from "../../../services/product";
import { categoryApiUrl, fetchCategory } from "../../../services/category";

import { useNavigate, useParams } from "react-router-dom";

const useEditProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const { mutate } = useSWRConfig();

  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    `${productApiUrl}/${id}`,
    fetchProduct
  );

  const { data: categoriesData, isLoading: categoriesLoading } = useSWR(
    `${categoryApiUrl}`,
    fetchCategory
  );

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  // Set form values when product data loads
  useEffect(() => {
    if (data?.product) {
      setValue("name", data.product.name);
      setValue("code", data.product.code);
      setValue("cost_price", data.product.cost_price);
      setValue("sell_price", data.product.sell_price);
      setValue("stock", data.product.stock);
      setValue("threshold", data.product.threshold);
      // Convert category_id to string to match option values
      setValue("category_id", String(data.product.category_id));
    }
  }, [data?.product, setValue]);

  const handleUpdateProduct = async (formData) => {
    try {
      setIsSending(true);
      await updateProduct({
        id,
        name: formData.name,
        code: formData.code.toUpperCase().trim(),
        cost_price: formData.cost_price,
        sell_price: formData.sell_price,
        stock: formData.stock,
        threshold: formData.threshold,
        category_id: formData.category_id,
      });
      mutate(import.meta.env.VITE_API_URL + `/product/${id}`);
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("An error occurred while updating the Product.");
      console.error("Error:", error);
    } finally {
      setIsSending(false);
      if (formData.back_to_product_list) {
        navigate("/dashboard/products");
      }
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    isLoading: isLoading || categoriesLoading,
    mutate,
    handleUpdateProduct,
    isSending,
    data: {
      product: data?.product,
      data: categoriesData?.data,
    },
    error,
    navigate,
  };
};

export default useEditProduct;
