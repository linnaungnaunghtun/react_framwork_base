import React from "react";

const VoucherItemEmptyRow = () => {
  return (
    <tr className=" border-b">
      <td colSpan={5} className=" text-center font-semibold  pe-4 py-4 ">
        There is no item in Voucher
      </td>
    </tr>
  );
};

export default VoucherItemEmptyRow;
