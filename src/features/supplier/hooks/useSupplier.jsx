import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useSearchParams } from "react-router-dom";
import { debounce, set } from "lodash";
import { supplierApiUrl, fetchSupplier } from "../../../services/supplier";
import { urlToParamObject } from "../../../utils/url";

const useSupplier = () => {
  const [params, setParams] = useSearchParams();
  const searchRef = useRef();
  const [fetchUrl, setFetchUrl] = useState(
    `${supplierApiUrl}?${params.toString()}`
  );

  useEffect(() => {
    setFetchUrl(`${supplierApiUrl}?${params.toString()}`);
    if (params.get("q")) {
      searchRef.current.value = params.get("q");
    } else {
      searchRef.current.value = "";
    }
  }, [params]);

  const { data, isLoading, error } = useSWR(fetchUrl, fetchSupplier);

  const handleSearchInput = debounce((e) => {
    if (e.target.value) {
      setParams({ q: e.target.value });
      setFetchUrl(`${supplierApiUrl}?q=${e.target.value}`);
    } else {
      setParams({});
      setFetchUrl(`${supplierApiUrl}`);
    }
  }, 500);

  const clearSearchInput = () => {
    searchRef.current.value = "";
    setParams({});
    setFetchUrl(`${supplierApiUrl}`);
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
    const newFetchUrl = `${supplierApiUrl}?${newSearchParams.toString()}`;
    setFetchUrl(newFetchUrl);
  };

  const handleSort = (sortData) => {
    const currentParams = Object.fromEntries(params);
    const newParams = { ...currentParams, ...sortData };
    setParams(newParams);
    const newSearchParams = new URLSearchParams(newParams);
    const newFetchUrl = `${supplierApiUrl}?${newSearchParams.toString()}`;
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

export default useSupplier;
