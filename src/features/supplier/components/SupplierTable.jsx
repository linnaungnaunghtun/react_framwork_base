import { HiSearch, HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SupplierLoader from "./SupplierLoader.jsx";
import SupplierEmptyStage from "./SupplierEmptyStage.jsx";
import SupplierRow from "./SupplierRow.jsx";
import Pagination from "../../../components/Pagination.jsx";
import Sortable from "../../../components/Sortable.jsx";
import useSupplier from "../hooks/useSupplier.jsx";

const SupplierTable = () => {
  const {
    searchRef,
    data,
    isLoading,
    handleSearchInput,
    handleSort,
    handleLimit,
    handlePaginate,
    clearSearchInput,
    params,
  } = useSupplier();

  return (
    <div>
      <div className="flex justify-between mb-5 ">
        <div className="">
          <div className="relative ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <HiSearch className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-stone-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search Supplier"
              onChange={handleSearchInput}
              ref={searchRef}
            />
            {params.get("q") && (
              <div
                className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer"
                onClick={clearSearchInput}
              >
                <HiX className="w-4 h-4 text-stone-500 dark:text-stone-400" />
              </div>
            )}
          </div>
        </div>
        <div className="">
          <Link
            to="/dashboard/suppliers-create"
            className="text-white flex justify-center items-center gap-3 bg-primary-400 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-400 dark:hover:bg-primary-500 dark:focus:ring-primary-600"
          >
            Add new Supplier
            <HiPlus />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
        <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
          <thead className="text-xs text-stone-700 uppercase bg-stone-100 dark:bg-stone-700 dark:text-stone-400">
            <tr>
              <th scope="col" className="px-6 py-5">
                <Sortable handleSort={handleSort} sort_by={`id`}>
                  #
                </Sortable>
              </th>
              <th scope="col" className="px-6 py-5">
                <Sortable handleSort={handleSort} sort_by={`name`}>
                  Name
                </Sortable>
              </th>
              <th scope="col" className="px-6 py-5">
                <Sortable handleSort={handleSort} sort_by={`contact`}>
                  Contact
                </Sortable>
              </th>

              <th scope="col" className="px-6 py-5 text-start">
                Address
              </th>

              <th scope="col" className="px-6 py-5 text-end">
                Created At
              </th>
              <th scope="col" className="px-6 py-5 text-end">
                Updated At
              </th>

              <th scope="col" className="px-6 py-5 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SupplierLoader />
            ) : data?.data?.length === 0 ? (
              <SupplierEmptyStage />
            ) : (
              data?.data?.map((supplier) => (
                <SupplierRow supplier={supplier} key={supplier.id} />
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        links={data?.links}
        meta={data?.meta}
        // updateFetchUrl={updateFetchUrl}
        handlePaginate={handlePaginate}
        handleLimit={handleLimit}
      />
    </div>
  );
};

export default SupplierTable;
