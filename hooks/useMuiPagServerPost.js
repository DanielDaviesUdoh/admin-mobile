import { useMuiPaginationPost } from "@/components/mui-pagination/hooks/useMuiPagination";
import { useEffect, useMemo, useState } from "react";
import useOutlet from "./useOutlet";

const useMuiPagServerPost = ({
  url,
  genPayload,
  runFetchData,
  setRunFetchData,
  createPagQueryKey,
  responseDot,
  responseTPages,
  getNewData,
  getTotalItems = null,
  setDataSignal,
  setPagQueryKey = null,
  setShowForm,
}) => {
  const [data, setData] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [requestedPage, setRequestedPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [requestedItemsPerPage, setRequestedItemsPerPage] =
    useState(itemsPerPage);

  const { setOutletNum } = useOutlet();

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const payload = useMemo(
    () => genPayload(requestedPage, requestedItemsPerPage),
    [genPayload, requestedPage, requestedItemsPerPage],
  );

  const pagQueryKey = useMemo(
    () => createPagQueryKey(requestedPage, requestedItemsPerPage),
    [requestedPage, requestedItemsPerPage, createPagQueryKey],
  );

  const {
    data: pagData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    statusCode,
  } = useMuiPaginationPost(pagQueryKey, url, payload, runFetchData);

  useEffect(() => {
    if (isSuccess && pagData?.[responseDot]?.length > 0) {
      setShowForm(false);
    }
  }, [isSuccess, setShowForm, pagData, responseDot]);

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
    setOutletNum(requestedPage);

    if (typeof setPagQueryKey === "function") {
      setPagQueryKey(pagQueryKey);
    }

    if (typeof getTotalItems === "function") {
      getTotalItems(total);
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
    getTotalItems,
    setOutletNum,
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

export default useMuiPagServerPost;
