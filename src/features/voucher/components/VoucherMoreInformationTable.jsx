import React from "react";
import ShowDateTime from "../../../components/ShowDateTime";

const VoucherMoreInformationTable = ({
  data: {
    user: { name },
    customer,
    created_at,
    payment_method,
    sale_type,
    net_profit,
    voucher_items,
    discount_percentage,
    discount_percent_amount,
    cash_discount,
    tax_amount
  },
}) => {
  const date = new Date(created_at);

  const currentDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const currentTime = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <>
      <h1 className=" font-bold mb-1">More Information </h1>

      <table className=" text-sm mb-5">
        <tbody>
          <tr>
            <td className=" pe-4 py-0.5 font-semibold ">Created by</td>
            <td className=" pe-4 py-0.5 ">{name}</td>
          </tr>
          <tr>
            <td className=" pe-4 py-0.5 font-semibold ">Created at</td>
            <td className=" pe-4 py-0.5 ">
              <span>
                {currentDate} {currentTime}
              </span>
            </td>
          </tr>
          <tr>
            <td className=" pe-4 py-0.5 font-semibold ">Payment method</td>
            <td className=" pe-4 py-0.5 ">{payment_method}</td>
          </tr>
          <tr>
            <td className=" pe-4 py-0.5 font-semibold ">Sale Type</td>
            <td className=" pe-4 py-0.5 ">{sale_type}</td>
          </tr>
          <tr>
            <td className=" pe-4 py-0.5 font-semibold ">Profit per Item</td>
            <td className=" pe-4 py-0.5 text-end">
              {voucher_items.map((item) => item.profit).join(", ")}
            </td>
          </tr>
          <tr>
            <td className=" pe-4 py-0.5 font-semibold ">Discount ({discount_percentage}%)</td>
            <td className=" pe-4 py-0.5 text-end">- {discount_percent_amount}</td>
          </tr>
          <tr>
            <td className=" pe-4 py-0.5 font-semibold ">Cash Discount</td>
            <td className=" pe-4 py-0.5 text-end">- {cash_discount}</td>
          </tr>
          <tr>
            <td className=" pe-4 py-0.5 font-semibold ">Tax Amount</td>
            <td className=" pe-4 py-0.5 text-end">- {tax_amount}</td>
          </tr>
          <tr>
            <td className=" pe-4 py-0.5 font-semibold ">Net Profit</td>
            <td className=" pe-4 py-0.5 text-end">{net_profit}</td>
          </tr>
        </tbody>
      </table>

      <h1 className=" font-bold mb-1">Customer Information </h1>
      <table className=" text-sm mb-3">
        <tbody>
          <tr>
            <td className="pe-4 py-0.5 font-semibold">Name</td>
            <td className="pe-4 py-0.5">{customer?.name}</td>
          </tr>
          <tr>
            <td className="pe-4 py-0.5 font-semibold">Phone Number</td>
            <td className="pe-4 py-0.5">{customer?.phone}</td>
          </tr>
          <tr>
            <td className="pe-4 py-0.5 font-semibold">Email</td>
            <td className="pe-4 py-0.5">{customer?.email}</td>
          </tr>

          <tr>
            <td className="pe-4 py-0.5 font-semibold">Gender</td>
            <td className="pe-4 py-0.5">{customer?.gender}</td>
          </tr>
          <tr>
            <td className="pe-4 py-0.5 font-semibold">State</td>
            <td className="pe-4 py-0.5">{customer?.state}</td>
          </tr>
          <tr>
            <td className="pe-4 py-0.5 font-semibold">Township</td>
            <td className="pe-4 py-0.5">{customer?.township}</td>
          </tr>
          <tr>
            <td className="pe-4 py-0.5 font-semibold">Address</td>
            <td className="pe-4 py-0.5">{customer?.address}</td>
          </tr>
          <tr>
            <td className="pe-4 py-0.5 font-semibold">Remark</td>
            <td className="pe-4 py-0.5">{customer?.remark}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default VoucherMoreInformationTable;
