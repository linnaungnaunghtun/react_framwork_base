import React from "react";
import { formatNumber } from "../../../utils/number";

const VoucherDetailTableRow = ({
  item: {
    product_name,
    product_code,
    display_price,
    discount,
    sale_price,
    size_name,
    barcode,
  },
}) => {
  return (
    <tr className="border-b border-stone-900">
      <td className="px-4 py-2  text-stone-900  ">
        <p className="">
          {product_name} {product_code} <br /> {size_name} / {barcode}
        </p>
      </td>
      <td className="pe-4 py-2 text-end align-top">{formatNumber(display_price)}</td>

      <td className="pe-4 py-2 text-end align-top">{formatNumber(discount)}</td>

      <td className="pe-4 py-2 text-end align-top">{formatNumber(sale_price)}</td>
    </tr>
  );
};

export default VoucherDetailTableRow;
