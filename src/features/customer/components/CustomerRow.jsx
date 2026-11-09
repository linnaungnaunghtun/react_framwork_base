import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { useSWRConfig } from "swr";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ShowDateTime from "../../../components/ShowDateTime";
import { customerApiUrl, destroyCustomer } from "../../../services/customer";
import Spinner from "../../../components/Spinner";

const CustomerRow = ({
  customer: {
    id,
    name,
    age,
    age_range,
    email,
    phone,
    remark,
    address,
    gender,
    level,
    created_at,
    state,
    township,
  },
}) => {
  const { mutate } = useSWRConfig();

  const [isDeleting, setIsDeleting] = useState(false);
  const [params, setParams] = useSearchParams();

  const handleDeleteBtn = async () => {
    try {
      setIsDeleting(true);
      const res = await destroyCustomer(id);
      const json = await res.json();
      //console.log(res);
      if (res.ok) {
        toast.success(json.message);
        mutate(`${customerApiUrl}?${params.toString()}`);
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the customer.");
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
        className="px-6 py-3 text-nowrap font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-6 py-3 text-nowrap text-end">{age}</td>
      <td className="px-6 py-3 text-nowrap text-end">{age_range}</td>
      <td className="px-6 py-3 text-nowrap text-end">
        {level.level} / {level.discount}%
      </td>
      <td className="px-6 py-3 text-nowrap text-start">{email}</td>
      <td className="px-6 py-3 text-nowrap text-end">{phone}</td>
      <td className="px-6 py-3 text-nowrap text-start">{remark}</td>
      <td className="px-6 py-3 text-nowrap text-start">{address}</td>
      <td className="px-6 py-3 text-nowrap text-start">{state}</td>
      <td className="px-6 py-3 text-nowrap text-start">{township}</td>
      <td className="px-6 py-3 text-nowrap text-end">{gender}</td>
      <td className="px-6 py-3 text-nowrap text-end">
        <ShowDateTime timestamp={created_at} />
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
            to={`/dashboard/customer-edit/${id}`}
            className="size-10 flex justify-center items-center text-sm font-medium text-stone-900 bg-white border border-stone-200 rounded-none first:rounded-s-lg last:rounded-e-lg hover:bg-stone-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-primary-500 dark:focus:text-white"
          >
            <HiOutlinePencil />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default CustomerRow;
