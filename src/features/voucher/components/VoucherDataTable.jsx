import React from "react";

const VoucherDataTable = ({
  data: {
    customer: { name, phone },
    voucher_date,
    voucher_no,
  },
}) => {
  return (
    <div className=" flex justify-end mb-5">
      <table className=" text-sm">
        <tbody>
          <tr>
            <td className=" px-4 py-0.5 font-semibold text-end">Voucher ID</td>
            <td className=" px-4 py-0.5 text-end">{voucher_no}</td>
          </tr>
          <tr>
            <td className=" px-4 py-0.5 font-semibold text-end">Voucher Date</td>
            <td className=" px-4 py-0.5 text-end">{voucher_date}</td>
          </tr>
          <tr>
            <td className=" px-4 py-0.5 font-semibold text-end">Customer</td>
            <td className=" px-4 py-0.5 text-end">{name}</td>
          </tr>
          <tr>
            <td className=" px-4 py-0.5 font-semibold text-end">Contact Number</td>
            <td className=" px-4 py-0.5 text-end">{phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VoucherDataTable;
