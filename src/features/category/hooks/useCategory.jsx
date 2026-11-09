import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useSearchParams } from "react-router-dom";
import { debounce, set } from "lodash";
import { categoryApiUrl, fetchCategory } from "../../../services/category";
import { urlToParamObject } from "../../../utils/url";

const useCategory = () => {
  const [params, setParams] = useSearchParams();
  const searchRef = useRef();
  const [fetchUrl, setFetchUrl] = useState(
    `${categoryApiUrl}?${params.toString()}`
  );

  useEffect(() => {
    setFetchUrl(`${categoryApiUrl}?${params.toString()}`);
    if (params.get("q")) {
      searchRef.current.value = params.get("q");
    } else {
      searchRef.current.value = "";
    }
  }, [params]);

  const { data, isLoading, error } = useSWR(fetchUrl, fetchCategory);

  const handleSearchInput = debounce((e) => {
    if (e.target.value) {
      setParams({ q: e.target.value });
      setFetchUrl(`${categoryApiUrl}?q=${e.target.value}`);
    } else {
      setParams({});
      setFetchUrl(`${categoryApiUrl}`);
    }
  }, 500);

  const clearSearchInput = () => {
    searchRef.current.value = "";
    setParams({});
    setFetchUrl(`${categoryApiUrl}`);
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
    const newFetchUrl = `${categoryApiUrl}?${newSearchParams.toString()}`;
    setFetchUrl(newFetchUrl);
  };

  const handleSort = (sortData) => {
    const currentParams = Object.fromEntries(params);
    const newParams = { ...currentParams, ...sortData };
    setParams(newParams);
    const newSearchParams = new URLSearchParams(newParams);
    const newFetchUrl = `${categoryApiUrl}?${newSearchParams.toString()}`;
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

export default useCategory;
