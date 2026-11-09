import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { voucherApiUrl, fetchVoucher } from "../../../services/voucher";
import { urlToParamObject } from "../../../utils/url";

const useVoucherData = () => {
  const [params, setParams] = useSearchParams();
  const searchRef = useRef();
  const [fetchUrl, setFetchUrl] = useState();

  useEffect(() => {
    setFetchUrl(`${voucherApiUrl}?${params.toString()}`);
    if (params.get("q")) {
      searchRef.current.value = params.get("q");
    } else {
      searchRef.current.value = "";
    }
  }, [params]);

  const { data, isLoading, error } = useSWR(fetchUrl, fetchVoucher);

  const handleSearchInput = debounce((e) => {
    if (e.target.value) {
      setParams({ q: e.target.value });
      setFetchUrl(`${voucherApiUrl}?q=${e.target.value}`);
    } else {
      setParams({});
      setFetchUrl(`${voucherApiUrl}`);
    }
  }, 500);

  const clearSearchInput = () => {
    searchRef.current.value = "";
    setParams({});
    setFetchUrl(`${voucherApiUrl}`);
  };

  const handlePaginate = (url) => {
    const newParams = urlToParamObject(url);
    setParams(newParams);
    setFetchUrl(url);
  };

  const handleLimit = (e) => {
    const currentParams = Object.fromEntries(params);
    const newParams = { ...currentParams, page: 1, limit: e.target.value };
    setParams(newParams);
    const newSearchParams = new URLSearchParams(newParams);
    const newFetchUrl = `${voucherApiUrl}?${newSearchParams.toString()}`;
    setFetchUrl(newFetchUrl);
  };

  const handleSort = (sortData) => {
    const currentParams = Object.fromEntries(params);
    const newParams = { ...currentParams, ...sortData };
    setParams(newParams);
    const newSearchParams = new URLSearchParams(newParams);
    const newFetchUrl = `${voucherApiUrl}?${newSearchParams.toString()}`;
    setFetchUrl(newFetchUrl);
  };

  return {
    searchRef,
    data,
    isLoading,
    error,
    handleSearchInput,
    clearSearchInput,
    handleSort,
    handlePaginate,
    handleLimit,
    params,
  };
};

export default useVoucherData;
