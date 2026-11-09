import { HiMinus, HiOutlineTrash } from "react-icons/hi2";
import useVoucherStore from "../../../stores/useVoucherStore";
import { useState } from "react";
const VoucherItemRow = ({
  item: {
    id,
    barcode,
    product: {
      product_name,
      product_code,
      display_price,
      sale_price,
      discount,
    },
    size: { size },
  },
}) => {
  const { removeItem, updateDisplayPrice, updateDiscount } = useVoucherStore();

  const [priceDisabled, setPriceDisabled] = useState(true);
  const [discountDisabled, setDiscountDisabled] = useState(true);

  const handleUpdateDisplayPrice = (e) => {
    const newDisplayPrice = e.target.value;
    // console.log(newDisplayPrice);
    updateDisplayPrice(barcode, newDisplayPrice);
  };

  const handleUpdateDiscount = (e) => {
    const newDiscount = e.target.value;
    // console.log(newDiscount);
    updateDiscount(barcode, newDiscount);
  };

  const handleDeleteBtn = () => {
    removeItem(barcode);
  };

  return (
    <>
      <tr className="border-b dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800">
        <td className="px-4 py-1 font-medium text-stone-900 dark:text-stone-200">
          <div className="flex flex-col items-start">
            <div className=" flex mb-1">
              <span className=" me-1">{product_name}</span>
              <a
                href={`https://google.com/search?q=${product_code}`}
                className=" underline text-nowrap"
                target="_blank"
              >
                {product_code}
              </a>
            </div>
            <div className="flex  items-center gap-2">
              <span className="bg-stone-100 border border-stone-300 text-[11px] text-center px-2 rounded-full mb-1">
                {size}
              </span>
              <span className="bg-stone-100 border border-stone-300 text-[11px] text-center px-2 rounded-full mb-1">
                {barcode}
              </span>
            </div>
          </div>
        </td>
        <td className="pe-4 py-1">
          <div className="flex justify-end w-full">
            <input
              type="number"
              defaultValue={display_price}
              onChange={handleUpdateDisplayPrice}
              className="bg-gray-50 border text-end border-gray-300 focus:ring-primary-500 focus:border-primary-500
               text-gray-900 text-sm  rounded-lg block w-[130px] p-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-moz-number-text]:appearance-none"
            />
          </div>
        </td>

        <td className="pe-4 py-1">
          <div className="flex justify-end w-full">
            <input
              type="number"
              defaultValue={discount}
              onChange={handleUpdateDiscount}
              className="bg-gray-50 border text-end border-gray-300 focus:ring-primary-500 focus:border-primary-500
               text-gray-900 text-sm rounded-lg block w-[100px] p-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-moz-number-text]:appearance-none"
            />
          </div>
        </td>

        <td className="pe-4 py-4 text-end">{sale_price}</td>
        <td className="pe-4 py-4 ">
          <button
            type="button"
            onClick={handleDeleteBtn}
            className="size-10 flex justify-center items-center text-sm font-medium  bg-white border border-stone-200 rounded-none first:rounded-s-lg last:rounded-e-lg hover:bg-stone-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-primary-500 dark:focus:text-white"
          >
            <HiOutlineTrash />
          </button>
        </td>
      </tr>
    </>
  );
};

export default VoucherItemRow;
