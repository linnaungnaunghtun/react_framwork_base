import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { storePurchase } from "../../../services/purchase";

export const useCreatePurchase = () => {
  const navigate = useNavigate();

  const createPurchase = async (purchaseData) => {
    try {
      const res = await storePurchase(purchaseData);
      const json = await res.json();
      console.log(json);

      if (res.status !== 200) {
        toast.error(json.message || "Failed to create purchase");
        return;
      }

      toast.success("Purchase created successfully");
      navigate("/dashboard/purchases");
    } catch (error) {
      toast.error("An error occurred while creating the purchase.");
      console.error("Error:", error);
    }
  };

  return { createPurchase, navigate };
};
