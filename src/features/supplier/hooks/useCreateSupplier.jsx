import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { storeSupplier } from "../../../services/supplier";

export const useCreateSupplier = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const createSupplier = async (data) => {
    try {
      const res = await storeSupplier({
        name : data.name,
        contact : data.contact,
        address : data.address
      });
      const json = await res.json();

      if (res.status !== 201) {
        toast.error(json.message);
        return;
      }

      toast.success("Supplier created successfully");
      reset();

      if (data.back_to_supplier_list) {
        navigate("/dashboard/suppliers");
      }
    } catch (error) {
      toast.error("An error occurred while creating the Supplier.");
      console.error("Error:", error);
    }
  };

  return { createSupplier, register, handleSubmit, isSubmitting, errors, navigate };
};
