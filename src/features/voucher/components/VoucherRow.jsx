import { useState } from "react";
import { HiArrowRight, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { useSWRConfig } from "swr";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ShowDateTime from "../../../components/ShowDateTime";
import { voucherApiUrl, destroyVoucher } from "../../../services/voucher";
import Spinner from "../../../components/Spinner";

const VoucherRow = ({
  voucher: {
    cash_discount,
    customer,
    customer_id,
    discount_percent_amount,
    discount_percentage,
    id,
    net_total,
    payment_method,
    sale_type,
    tax,
    tax_amount,
    total,
    user,
    user_id,
    voucher_date,
    voucher_no,
    voucher_items,
    created_at,
    updated_at,
  },
}) => {
  return (
    <tr className="odd:bg-white odd:dark:bg-stone-900 even:bg-stone-100 even:dark:bg-stone-800 dark:border-stone-700">
      <td className="px-6 py-3">{id}</td>
      <th
        scope="row"
        className="px-6 py-3 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {voucher_no}
      </th>
      <td className="px-6 py-3 text-end">{voucher_date}</td>
      <td className="px-6 py-3 text-end">{net_total}</td>
      <td className="px-6 py-3 ">
        <div>
          <p>{customer.name}</p>
          <p className=" text-xs">{customer.phone}</p>
        </div>
      </td>
      <td className="px-6 py-3">{sale_type}</td>
      <td className="px-6 py-3">{payment_method}</td>

      <td className="px-6 py-3 text-end">
        <ShowDateTime timestamp={created_at} />
      </td>
      <td className="px-6 py-3 text-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Link
            to={`/dashboard/voucher-detail/${id}`}
            className="size-10 flex justify-center items-center text-sm font-medium text-stone-900 bg-white border border-stone-200 rounded-none first:rounded-s-lg last:rounded-e-lg hover:bg-stone-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-primary-500 dark:focus:text-white"
          >
            <HiArrowRight />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default VoucherRow;
