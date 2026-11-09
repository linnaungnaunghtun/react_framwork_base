import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useSearchParams } from "react-router-dom";
import { debounce, set } from "lodash";
import { purchaseApiUrl, fetchPurchase } from "../../../services/purchase";

import { urlToParamObject } from "../../../utils/url";

const usePurchase = () => {
  const [params, setParams] = useSearchParams();
  const searchRef = useRef();
  const [fetchUrl, setFetchUrl] = useState(
    `${purchaseApiUrl}?${params.toString()}`
  );

  useEffect(() => {
    setFetchUrl(`${purchaseApiUrl}?${params.toString()}`);
    if (params.get("q")) {
      searchRef.current.value = params.get("q");
    } else {
      searchRef.current.value = "";
    }
  }, [params]);

  const { data, isLoading, error } = useSWR(fetchUrl, fetchPurchase);

  const handleSearchInput = debounce((e) => {
    if (e.target.value) {
      setParams({ q: e.target.value });
      setFetchUrl(`${purchaseApiUrl}?q=${e.target.value}`);
    } else {
      setParams({});
      setFetchUrl(`${purchaseApiUrl}`);
    }
  }, 500);

  const clearSearchInput = () => {
    searchRef.current.value = "";
    setParams({});
    setFetchUrl(`${purchaseApiUrl}`);
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
    const newFetchUrl = `${purchaseApiUrl}?${newSearchParams.toString()}`;
    setFetchUrl(newFetchUrl);
  };

  const handleSort = (sortData) => {
    const currentParams = Object.fromEntries(params);
    const newParams = { ...currentParams, ...sortData };
    setParams(newParams);
    const newSearchParams = new URLSearchParams(newParams);
    const newFetchUrl = `${purchaseApiUrl}?${newSearchParams.toString()}`;
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

export default usePurchase;
