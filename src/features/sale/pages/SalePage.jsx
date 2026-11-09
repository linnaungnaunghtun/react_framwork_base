import React from 'react';
import BreadCrumb from '../../../components/BreadCrumb';
import CreateSale from '../components/CreateSale';

const SalePage = () => {
  return (
    <section>
      <BreadCrumb
        currentPageTitle={"Sale Module"}
       
      />
      <CreateSale/> 
    </section>
  );
}

export default SalePage;
