import React, { useRef } from "react";
import VoucherDetailTable from "./VoucherDetailTable";
import useSWR from "swr";
import { fetchVoucher, voucherApiUrl } from "../../../services/voucher";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import VoucherDataTable from "./VoucherDataTable";
import { toPng } from "html-to-image";

import voucherHeader from "../../../assets/voucher-header.png";
import voucherFooter from "../../../assets/voucher-footer.png";
import { LucideImageDown, LucidePrinter } from "lucide-react";
import { HiComputerDesktop, HiDocumentDuplicate } from "react-icons/hi2";
import VoucherMoreInformationTable from "./VoucherMoreInformationTable";

const VoucherDetail = () => {
  const { id } = useParams();

  const printAreaRef = useRef();

  const { data, isLoading, error } = useSWR(
    `${voucherApiUrl}/${id}`,
    fetchVoucher
  );

  const handlePrint = () => {
    const printContents = printAreaRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleExportImage = () => {
    if (printAreaRef.current) {
      toPng(printAreaRef.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${data.data.voucher_no}.png`;
        link.click();
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className=" mb-20">
      <div className="flex flex-row gap-5">
        <div className=" border">
          <div
            className="w-[8.27in] min-h-[11.69in] bg-white flex flex-col"
            ref={printAreaRef}
          >
            <img src={voucherHeader} className=" w-full print:hidden" />
            <div className="h-0 print:h-40"></div>
            <div className=" print:p-0 p-[1cm] pb-0">
              <VoucherDataTable data={data.data} />
              <VoucherDetailTable data={data.data} />
            </div>
            <img src={voucherFooter} className=" w-full mt-auto print:hidden" />
          </div>
        </div>
        <div className="flex-grow">
          <div className="sticky top-10">
            <div className="mb-7 ">
              <h1 className=" font-bold mb-2">Export Menu</h1>
              <div className=" flex  gap-3">
                <button
                  onClick={handlePrint}
                  className="text-white flex justify-center items-center gap-3 bg-primary-400 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-400 dark:hover:bg-primary-500 dark:focus:ring-primary-600"
                >
                  Print Voucher
                  <LucidePrinter className=" size-4" />
                </button>
                <button
                  onClick={handleExportImage}
                  className="text-white flex justify-center items-center gap-3 bg-primary-400 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-400 dark:hover:bg-primary-500 dark:focus:ring-primary-600"
                >
                  Export Image
                  <LucideImageDown className=" size-4" />
                </button>
              </div>
            </div>
            <div className="">
              <VoucherMoreInformationTable data={data.data} />
              <div className=" flex gap-3">
                <Link
                  to="/dashboard/vouchers"
                  className="text-white flex justify-center items-center gap-3 bg-primary-400 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-400 dark:hover:bg-primary-500 dark:focus:ring-primary-600"
                >
                  See All Vouchers
                  <HiDocumentDuplicate className=" size-4" />
                </Link>
                <Link
                  to="/dashboard/sales"
                  className="text-white flex justify-center items-center gap-3 bg-primary-400 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-400 dark:hover:bg-primary-500 dark:focus:ring-primary-600"
                >
                  New Sale
                  <HiComputerDesktop className=" size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoucherDetail;
