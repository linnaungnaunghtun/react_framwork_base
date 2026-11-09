import VoucherItemRow from "./VoucherItemRow";
import VoucherItemEmptyRow from "./VoucherItemEmptyRow";
import useCalculate from "../hooks/useCalculate";

const VoucherItemTable = () => {
  const {
    total,
    items,
    tax,
    discountPercentage,
    cashDiscount,
    discountPercentageAmount,
    taxAmount,
    netTotal,
  } = useCalculate();

  return (
    <div className="">
      <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
        <thead className="text-xs text-stone-700 uppercase bg-stone-100 dark:bg-stone-700 dark:text-stone-400">
          <tr>
            <th scope="col" className="px-4 py-5">
              Products
            </th>
            <th scope="col" className="px-4 py-5 text-end">
              Price
            </th>

            <th scope="col" className="px-4 py-5 text-end">
              Discount
            </th>

            <th scope="col" className="px-4 py-5 text-end w-[120px]">
              Cost
            </th>

            <th scope="col" className="px-4 py-5 text-end"></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <VoucherItemEmptyRow />
          ) : (
            items.map((item) => <VoucherItemRow key={item.id} item={item} />)
          )}
        </tbody>

        {items.length > 0 && (
          <tfoot className=" ">
            <tr className="border-b">
              <td
                className=" font-semibold uppercase pe-4 py-4 text-end"
                colSpan={3}
              >
                Total
              </td>
              <td className="pe-4 py-4 text-end">{total}</td>
              <td className="pe-4 py-4 text-end"></td>
            </tr>

            {discountPercentageAmount ? (
              <tr className="border-b">
                <td
                  className=" font-semibold uppercase pe-4 py-4 text-end"
                  colSpan={3}
                >
                  Discount ( {discountPercentage}% )
                </td>
                <td className="pe-4 py-4 text-end">
                  {" "}
                  - {discountPercentageAmount}
                </td>
                <td className="pe-4 py-4 text-end"></td>
              </tr>
            ) : (
              ""
            )}

            {cashDiscount ? (
              <tr className="border-b">
                <td
                  className=" font-semibold uppercase pe-4 py-4 text-end"
                  colSpan={3}
                >
                  Cash Discount
                </td>
                <td className="pe-4 py-4 text-end"> - {cashDiscount}</td>
                <td className="pe-4 py-4 text-end"></td>
              </tr>
            ) : (
              ""
            )}
            {tax && (
              <tr className="border-b">
                <td
                  className=" font-semibold uppercase pe-4 py-4 text-end"
                  colSpan={3}
                >
                  Tax ( 5% )
                </td>
                <td className="pe-4 py-4 text-end">{taxAmount}</td>
                <td className="pe-4 py-4 text-end"></td>
              </tr>
            )}
            <tr className="border-b">
              <td
                className=" font-semibold uppercase pe-4 py-4 text-end"
                colSpan={3}
              >
                Net Total
              </td>
              <td className="pe-4 py-4 text-end font-semibold">{netTotal}</td>
              <td className="pe-4 py-4 text-start font-semibold">MMK</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default VoucherItemTable;
