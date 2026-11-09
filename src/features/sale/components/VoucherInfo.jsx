import { LucideCalendar, LucideHash } from "lucide-react";
import AddProductForm from "./AddProductForm";
import useVoucherStore from "../../../stores/useVoucherStore";
import { useEffect } from "react";
import { generateRandomVoucherId, today } from "../../../utils/general";

const VoucherInfo = () => {
  const { voucherId, voucherDate, setVoucherId, setVoucherDate } =
    useVoucherStore();

  const handleDateChange = (event) => {
    setVoucherDate(event.target.value);
  };

  // useEffect(() => {
  //   setVoucherId(generateRandomVoucherId());
  //   setVoucherDate(today());
  // }, []);

  return (
    <div className="flex justify-between items-start gap-3 mb-5">
      <div className=" flex gap-5">
        <div>
          <label className={`block mb-2 text-sm font-medium dark:text-white`}>
            Voucher ID
          </label>
          <div className="relative mb-6">
            <button className="absolute inset-y-0 start-0 flex items-center rounded-s-md px-3 pointer-events-none bg-primary-300 text-primary-50">
              <LucideHash size={20} className=" stroke-2 " />
            </button>
            <input
              type="text"
              defaultValue={voucherId}
              placeholder="Voucher ID"
              className={`bg-gray-50 border ps-14 border-gray-300  focus:ring-primary-500 focus:border-primary-500 text-gray-900 text-sm rounded-lg block p-2.5 w-[230px] `}
            />
          </div>
        </div>
        <div>
          <label className={`block mb-2 text-sm font-medium dark:text-white`}>
            Voucher Date
          </label>
          <div className="relative mb-6">
            <button className="absolute inset-y-0 start-0 flex items-center pointer-events-none rounded-s-md px-3 bg-primary-300 text-primary-50">
              <LucideCalendar size={20} className=" stroke-2 " />
            </button>
            <input
              type="date"
              defaultValue={voucherDate}
              onChange={handleDateChange}
              placeholder="Voucher Date"
              className={`bg-gray-50 border ps-14 border-gray-300  focus:ring-primary-500 focus:border-primary-500 text-gray-900 text-sm rounded-lg block p-2.5 w-[230px] `}
            />
          </div>
        </div>
      </div>

      <div className="">
        <AddProductForm />
      </div>
    </div>
  );
};

export default VoucherInfo;
