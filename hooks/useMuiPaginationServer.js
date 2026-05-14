import { useMuiPagination } from "@/components/mui-pagination/hooks/useMuiPagination";
import { useEffect, useMemo, useState } from "react";

const useMuiPaginationServer = ({
  runFetchData,
  setRunFetchData,
  createPagEndpoint,
  createPagQueryKey,
  responseDot,
  responseTPages,
  getNewData,
  setDataSignal,
  setPagQueryKey = null,
}) => {
  const [data, setData] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [requestedPage, setRequestedPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [requestedItemsPerPage, setRequestedItemsPerPage] =
    useState(itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pagQueryKey = useMemo(
    () => createPagQueryKey(requestedPage, requestedItemsPerPage),
    [requestedPage, requestedItemsPerPage, createPagQueryKey],
  );

  const pagEndpoint = useMemo(
    () => createPagEndpoint(requestedPage, requestedItemsPerPage),
    [requestedPage, requestedItemsPerPage, createPagEndpoint],
  );

  const {
    data: pagData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    statusCode,
  } = useMuiPagination(pagQueryKey, pagEndpoint, runFetchData);

  useEffect(() => {
    if (!setDataSignal) return;
    setDataSignal({ isLoading, isError, statusCode });
  }, [setDataSignal, isLoading, isError, statusCode]);

  useEffect(() => {
    if (runFetchData && !isFetching) {
      setRunFetchData(false);
    }
  }, [runFetchData, setRunFetchData, isFetching]);

  useEffect(() => {
    if (!isSuccess || !pagData) return;

    const newData = pagData[responseDot] || [];
    const total = pagData[responseTPages] || 0;

    setData(newData);
    setTotalItems(total);
    setCurrentPage(requestedPage);
    setItemsPerPage(requestedItemsPerPage);

    if (typeof setPagQueryKey === "function") {
      setPagQueryKey(pagQueryKey);
    }

    getNewData(newData);
  }, [
    isSuccess,
    pagData,
    responseDot,
    responseTPages,
    requestedPage,
    requestedItemsPerPage,
    pagQueryKey,
    setPagQueryKey,
    getNewData,
  ]);

  return {
    data,
    totalItems,
    currentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    setRequestedPage,
    setRequestedItemsPerPage,
  };
};

export default useMuiPaginationServer;
