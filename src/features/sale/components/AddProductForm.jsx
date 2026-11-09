import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuCornerDownLeft } from "react-icons/lu";
import Spinner from "../../../components/Spinner";
import { fetchStockWithBarcode } from "../../../services/stock";
import useVoucherStore from "../../../stores/useVoucherStore";

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { items, addItem } = useVoucherStore();

  const onSubmit = async ({ barcode }) => {
    const trimmedBarcode = barcode.toUpperCase().trim();

    if (items.find((el) => el.barcode === trimmedBarcode)) {
      toast.error("Item already added!");
      return false;
    }

    const res = await fetchStockWithBarcode(trimmedBarcode);

    const json = await res.json();

    if (!res.ok) {
      toast.error(json.message);
      return false;
    }

    toast.success(json.message);

    addItem(json.data);

    reset();
  };

  useEffect(() => {
    if (errors.barcode) {
      toast.error("Barcode is required!");
    }
  }, [errors.barcode]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={`block mb-2 text-sm font-medium dark:text-white`}>
        Sale Item
      </label>
      <div className="relative mb-6">
        <button className="absolute inset-y-0 end-0 flex items-center rounded-e-md px-3 bg-primary-300 text-primary-50">
          {isSubmitting ? <Spinner /> : <LuCornerDownLeft size={20} />}
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus={true}
          placeholder="Input Barcode Here"
          {...register("barcode", {
            required: true,
          })}
          className={`bg-gray-50 border uppercase border-gray-300  focus:ring-primary-500 focus:border-primary-500 text-gray-900 text-sm rounded-lg block p-2.5 w-[280px]`}
        />
      </div>
    </form>
  );
};

export default AddProductForm;
