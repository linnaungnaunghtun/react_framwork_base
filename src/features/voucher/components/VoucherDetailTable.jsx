import { formatNumber } from "../../../utils/number";
import VoucherDetailTableRow from "./VoucherDetailTableRow";

const VoucherDetailTable = ({
  data: {
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
    voucher_items,
    voucher_no,
  },
}) => {
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-stone-900 dark:text-stone-900">
        <thead className="text-xs text-stone-900 border-y border-stone-900 uppercase  dark:bg-stone-900 dark:text-stone-900">
          <tr>
            <th scope="col" className="px-4 py-3">
              Products
            </th>
            <th scope="col" className="px-4 py-3 text-end w-[120px]">
              Price
            </th>

            <th scope="col" className="px-4 py-3 text-end w-[120px]">
              Discount
            </th>

            <th scope="col" className="px-4 py-3 text-end w-[120px]">
              Cost
            </th>
          </tr>
        </thead>
        <tbody>
          {voucher_items?.map((item) => (
            <VoucherDetailTableRow key={item.id} item={item} />
          ))}
        </tbody>

        <tfoot className=" ">
          {discount_percentage || cash_discount || tax ? (
            <tr className="">
              <td
                className=" font-semibold text-xs uppercase pe-4 pt-2 pb-1 text-end"
                colSpan={3}
              >
                Total
              </td>
              <td className="pe-4 pt-2 pb-1 text-end">{formatNumber(total)}</td>
            </tr>
          ) : (
            ""
          )}

          {discount_percentage ? (
            <tr className="">
              <td
                className=" font-semibold text-xs uppercase pe-4 py-1 text-end"
                colSpan={3}
              >
                Discount
              </td>
              <td className="pe-4 py-1 text-end">
                {" "}
                - {formatNumber(discount_percent_amount)}
              </td>
            </tr>
          ) : (
            ""
          )}

          {cash_discount ? (
            <tr className="">
              <td
                className=" font-semibold text-xs uppercase pe-4 py-1 text-end"
                colSpan={3}
              >
                Cash Discount
              </td>
              <td className="pe-4 py-1 text-end">
                {" "}
                - {formatNumber(cash_discount)}
              </td>
            </tr>
          ) : (
            ""
          )}

          {tax ? (
            <tr className="">
              <td
                className=" font-semibold text-xs uppercase pe-4 pt-2 pb-2 text-end"
                colSpan={3}
              >
                Tax ( 5% )
              </td>
              <td className="pe-4 pt-2 pb-2 text-end">
                {formatNumber(tax_amount)}
              </td>
            </tr>
          ) : (
            ""
          )}

          <tr className="border-y border-stone-900">
            <td
              className=" font-bold text-xs uppercase pe-4 py-3 text-end"
              colSpan={3}
            >
              Net Total
            </td>
            <td className="pe-4 py-3 text-end font-bold">
              {formatNumber(net_total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default VoucherDetailTable;
