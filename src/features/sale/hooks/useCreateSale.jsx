import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { storeSale } from "../../../services/sale";
import { updateStockAfterSale } from "../../../services/stock";

const useCreateSale = () => {
  const navigate = useNavigate();

  const createSale = async (data) => {
    try {
      const res = await storeSale({
        user_id: data.user_id,
        customer_id: data.customer_id,
        date: data.date,
        discount_percentage: data.discount_percentage || 0,
        items: data.items,
      });
      const json = await res.json();

      if (res.status !== 201) {
        toast.error(json.message);
        return;
      }

      // Update stock for each sold item
      try {
        const stockUpdatePromises = data.items.map((item) =>
          updateStockAfterSale(item.product_id, item.quantity)
        );

        await Promise.all(stockUpdatePromises);
        console.log("Stock updated successfully for all items");
      } catch (stockError) {
        console.error("Error updating stock:", stockError);
        // Don't fail the sale if stock update fails, but log the error
        toast.error(
          "Sale created but there was an issue updating stock. Please check inventory."
        );
      }

      toast.success("Sale created successfully");
      navigate("/dashboard/sales");
    } catch (error) {
      toast.error("An error occurred while creating the Sale.");
      console.error("Error:", error);
    }
  };

  return {
    createSale,
  };
};

export default useCreateSale;
