import React from "react";

import SaleInformationForm from "./SaleInformationForm";
import VoucherItemTable from "./VoucherItemTable";
import VoucherInfo from "./VoucherInfo";

const CreateSale = () => {
  return (
    <>
      <div className="w-full grid grid-cols-7 gap-5">
        <div className="col-span-5">
          <VoucherInfo />
          <VoucherItemTable />
        </div>

        <div className="col-span-2">
          <SaleInformationForm />
        </div>
      </div>
    </>
  );
};

export default CreateSale;
