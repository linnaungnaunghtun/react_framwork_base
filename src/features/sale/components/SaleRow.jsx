import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from "react-icons/hi2";
import { useSWRConfig } from "swr";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ShowDateTime from "../../../components/ShowDateTime.jsx";
import { saleApiUrl, destroySale } from "../../../services/sale.js";
import Spinner from "../../../components/Spinner.jsx";

const SaleRow = ({
  sale: {
    id,
    user_id,
    customer_name,
    total_amount,
    date,
    created_at,
    updated_at,
  },
}) => {
  const { mutate } = useSWRConfig();

  const [isDeleting, setIsDeleting] = useState(false);
  const [params, setParams] = useSearchParams();

  const handleDeleteBtn = async () => {
    try {
      setIsDeleting(true);
      const res = await destroySale(id);
      const json = await res.json();

      if (res.ok) {
        toast.success(json.message);
        mutate(`${saleApiUrl}?${params.toString()}`);
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the sale.");
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr className="odd:bg-white odd:dark:bg-stone-900 even:bg-stone-100 even:dark:bg-stone-800 dark:border-stone-700">
      <td className="px-6 py-3">{id}</td>
      
      <th
        scope="row"
        className="px-6 py-3 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {customer_name}
      </th>
      <th
        scope="row"
        className="px-6 py-3 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        ${parseFloat(total_amount).toFixed(2)}
      </th>
      <td className="px-6 py-3">
        <ShowDateTime timestamp={date} />
      </td>
      <td className="px-6 py-3 text-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={handleDeleteBtn}
            className="size-10 flex justify-center items-center text-sm font-medium bg-white border border-stone-200 rounded-none first:rounded-s-lg last:rounded-e-lg hover:bg-stone-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-primary-500 dark:focus:text-white"
          >
            {isDeleting ? <Spinner /> : <HiOutlineTrash />}
          </button>
          
          <Link
            to={`/dashboard/sales/${id}`}
            className="size-10 flex justify-center items-center text-sm font-medium text-stone-900 bg-white border border-stone-200 rounded-none first:rounded-s-lg last:rounded-e-lg hover:bg-stone-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-primary-500 dark:focus:text-white"
          >
            <HiOutlineEye />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default SaleRow;
