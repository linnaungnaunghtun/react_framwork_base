import { useState } from "react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiExclamationTriangle,
} from "react-icons/hi2";
import { useSWRConfig } from "swr";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ShowDateTime from "../../../components/ShowDateTime.jsx";
import { productApiUrl, destroyProduct } from "../../../services/product.js";
import Spinner from "../../../components/Spinner.jsx";
import {
  getStockStatus,
  getStockStatusColor,
  getStockStatusText,
} from "../../../utils/stock.js";

const ProductRow = ({
  product: {
    id,
    name,
    code,
    cost_price,
    sell_price,
    stock,
    threshold,
    category_name,
    created_at,
    updated_at,
  },
}) => {
  const { mutate } = useSWRConfig();

  const [isDeleting, setIsDeleting] = useState(false);
  const [params, setParams] = useSearchParams();

  // Get stock status for this product
  const stockStatus = getStockStatus(stock, threshold);
  const stockStatusColor = getStockStatusColor(stockStatus);
  const stockStatusText = getStockStatusText(stockStatus);

  const handleDeleteBtn = async () => {
    try {
      setIsDeleting(true);
      const res = await destroyProduct(id);
      const json = await res.json();
      //console.log(res);
      if (res.ok) {
        toast.success(json.message);
        mutate(`${productApiUrl}?${params.toString()}`);
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product.");
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
        {name}
      </th>
      <th
        scope="row"
        className="px-6 py-3 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {code}
      </th>

      <th
        scope="row"
        className="px-6 py-3 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {category_name}
      </th>

      <th
        scope="row"
        className="px-6 py-3 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {cost_price}
      </th>
      <th
        scope="row"
        className="px-6 py-3 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {sell_price}
      </th>
      <th
        scope="row"
        className="px-6 py-3 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-center gap-2">
          <span>{stock}</span>
          {stockStatus !== "normal" && (
            <div
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stockStatusColor}`}
            >
              <HiExclamationTriangle className="w-3 h-3" />
              {stockStatusText}
            </div>
          )}
        </div>
      </th>
      <th
        scope="row"
        className="px-6 py-3 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {threshold}
      </th>

      <th
        scope="row"
        className="px-6 py-3 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        <ShowDateTime timestamp={created_at} />
      </th>
      <td className="px-6 py-3 text-end">
        <ShowDateTime timestamp={updated_at} />
      </td>

      <td className="px-6 py-3 text-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={handleDeleteBtn}
            className="size-10 flex justify-center items-center text-sm font-medium  bg-white border border-stone-200 rounded-none first:rounded-s-lg last:rounded-e-lg hover:bg-stone-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-primary-500 dark:focus:text-white"
          >
            {isDeleting ? <Spinner /> : <HiOutlineTrash />}
          </button>
          <Link
            to={`/dashboard/products-edit/${id}`}
            className="size-10 flex justify-center items-center text-sm font-medium text-stone-900 bg-white border border-stone-200 rounded-none first:rounded-s-lg last:rounded-e-lg hover:bg-stone-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-primary-500 dark:focus:text-white"
          >
            <HiOutlinePencil />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
