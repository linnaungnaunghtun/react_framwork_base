import React, { useEffect } from "react";

import { CustomerSelect } from "./CustomerSelect";
import { useForm } from "react-hook-form";
import useVoucherStore from "../../../stores/useVoucherStore";
import toast from "react-hot-toast";
import { storeVoucher } from "../../../services/voucher";
import { Link, useNavigate } from "react-router-dom";
import { LucidePlus } from "lucide-react";
import useCalculate from "../hooks/useCalculate";
import { validateStockForSale } from "../../../utils/stock";

const SaleInformationForm = () => {
  const {
    voucherId,
    voucherDate,
    setDiscountPercentage,
    setCashDiscount,
    setTax,
    resetVoucher,
  } = useVoucherStore();

  const {
    total,
    items,
    tax,
    discountPercentage,
    cashDiscount,
    discountPercentageAmount,
    cashDiscountAmount,
    discountedTotal,
    taxAmount,
    netTotal,
  } = useCalculate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    resetField,
    reset,
    watch,
  } = useForm();

  const navigate = useNavigate();

  const currentPayAmount = watch("pay_amount");

  const handleTax = () => {
    setTax(!tax);
  };

  const handleDiscountPercentage = (e) => {
    const discountPercentage = e.target.value;
    setDiscountPercentage(discountPercentage);
  };

  const handleCashDiscount = (e) => {
    const cashDiscount = e.target.value;
    setCashDiscount(cashDiscount);
  };

  const handleChangeCustomer = (data) => {
    resetField("discount_percentage", { defaultValue: data.level.discount });
    setDiscountPercentage(data.level.discount);
  };

  const onSubmit = async (data) => {
    if (!voucherId) {
      toast.error("Please generate Voucher ID");
      return false;
    }
    if (!voucherDate) {
      toast.error("Please select Voucher Date");
      return false;
    }
    if (!data.customer_id) {
      toast.error("Please select a customer");
      return false;
    }
    if (items.length === 0) {
      toast.error("Please add product to make a voucher");
      return false;
    }

    // Validate stock availability for each item
    const stockValidationErrors = [];
    for (const item of items) {
      if (item.product && item.quantity) {
        const stockValidation = validateStockForSale(
          item.product.stock,
          item.quantity
        );
        if (!stockValidation.isValid) {
          stockValidationErrors.push({
            productName: item.product.name,
            requestedQuantity: stockValidation.requestedQuantity,
            availableQuantity: stockValidation.availableQuantity,
            shortfall: stockValidation.shortfall,
          });
        }
      }
    }

    // If there are stock validation errors, show them and prevent sale
    if (stockValidationErrors.length > 0) {
      let errorMessage = "Cannot complete sale due to insufficient stock:\n\n";
      stockValidationErrors.forEach((error) => {
        errorMessage += `• ${error.productName}: Requested ${error.requestedQuantity}, Available ${error.availableQuantity} (Shortfall: ${error.shortfall})\n`;
      });
      toast.error(errorMessage);
      return false;
    }

    const res = await storeVoucher({
      items,
      voucher_no: voucherId,
      voucher_date: voucherDate,
      ...data,
      total,
      tax,
      tax_amount: taxAmount,
      discount_percent_amount: discountPercentageAmount,
      net_total: netTotal,
    });

    const json = await res.json();

    if (!res.ok) {
      toast.error(json.message);
      return false;
    }
    toast.success(json.message);
    navigate(`/dashboard/voucher-detail/${json.data.id}`);
    reset();
    resetVoucher();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <div className=" flex gap-4 items-end">
          <div className=" flex-grow">
            <label
              htmlFor="customers"
              className={`block mb-2 text-sm font-medium`}
            >
              Select Customers <span className=" text-red-500">*</span>
            </label>
            <CustomerSelect
              register={register}
              setValue={setValue}
              inputName={"customer_id"}
              handleChangeCustomer={handleChangeCustomer}
            />
          </div>
          <Link
            to="/dashboard/customer-create"
            target="_blank"
            className="bg-gray-50 border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-gray-900 text-sm rounded-lg block p-2.5 "
          >
            <LucidePlus size={20} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 mb-5 gap-4">
        <div className=" col-span-2">
          <label htmlFor="type" className={`block mb-2 text-sm font-medium`}>
            Sale Types <span className=" text-red-500">*</span>
          </label>
          <select
            {...register("sale_type")}
            required
            className={`bg-gray-50 border border-gray-300 focus:ring-primary-500 focus:border-primary-500  text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          >
            <option value="">Choose Types</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <div className=" col-span-2">
          <label htmlFor="method" className={`block mb-2 text-sm font-medium`}>
            Payment Method <span className=" text-red-500">*</span>
          </label>
          <select
            {...register("payment_method")}
            required
            className={`bg-gray-50 border border-gray-300 focus:ring-primary-500 focus:border-primary-500  text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          >
            <option value="">Choose Methods</option>
            <option value="cash">Cash</option>
            <option value="Wallet">Wallet</option>
            <option value="card">Card</option>
          </select>
        </div>
      </div>

      <div className=" grid grid-cols-4 gap-4 mb-5">
        <div className=" col-span-1">
          <label className={`block mb-2 text-sm font-medium dark:text-white`}>
            Dis %
          </label>
          <input
            type="number"
            min={0}
            max={100}
            {...register("discount_percentage", {
              onChange: handleDiscountPercentage,
            })}
            defaultValue={discountPercentage}
            className={`bg-gray-50 border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-moz-number-text]:appearance-none`}
          />
        </div>
        <div className=" col-span-3">
          <label className={`block mb-2 text-sm font-medium dark:text-white`}>
            Cash Discount
          </label>
          <input
            {...register("cash_discount", { onChange: handleCashDiscount })}
            type="number"
            className={`bg-gray-50 border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-moz-number-text]:appearance-none`}
          />
        </div>
      </div>

      <div className=" mb-5">
        <label className={`block mb-2 text-sm font-medium dark:text-white`}>
          Calculate Change{" "}
          {currentPayAmount && netTotal && `(${currentPayAmount - netTotal})`}
        </label>
        <input
          type="number"
          {...register("pay_amount")}
          placeholder="Pay Cash"
          className={`bg-gray-50 border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-moz-number-text]:appearance-none`}
        />
      </div>

      <div className=" mt-10">
        <div className="flex items-center mb-3">
          <input
            id="tax"
            type="checkbox"
            {...register("tax", { onChange: handleTax })}
            defaultChecked={tax}
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
          />
          <label
            htmlFor="tax"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Pay Tax ( 5% )
          </label>
        </div>
        <div className="flex items-center mb-3">
          <input
            id="all-correct"
            type="checkbox"
            required
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
          />
          <label
            htmlFor="all-correct"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Make sure all fields are correct
          </label>
        </div>

        <div className="mb-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`text-white bg-primary-400 disabled:pointer-events-none disabled:opacity-80 text-base rounded-lg block w-full p-4`}
          >
            Checkout {isSubmitting ? "..." : "Sale"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SaleInformationForm;
