import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import useOutlet from "./useOutlet";
import { usePostDataTwo } from "./usePostDataTwo";

const useMuiPagServerTwo = ({
  url,
  payload,
  // createPagQueryKey,
  responseDot,
  responseTPages,
  setDataSignal,
  setPagQueryKey = null,
  defaultPage,
  requestedPage,
  requestedItemsPerPage,
  queryKey,
}) => {
  const [data, setData] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(defaultPage);

  const { setOutletNum } = useOutlet();

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const queryClient = useQueryClient();

  const { mutate, isPending } = usePostDataTwo({
    onSuccess: ({ status, data: response }) => {
      const newData = response?.[responseDot] || [];
      const total = response?.[responseTPages] || 0;

      queryClient.setQueryData(queryKey, {
        data: newData,
        totalItems: total,
      });

      setData(newData);
      setTotalItems(total);
      setCurrentPage(requestedPage);
      setItemsPerPage(requestedItemsPerPage);
      setOutletNum(requestedPage);

      if (typeof setPagQueryKey === "function") {
        setPagQueryKey(queryKey);
      }

      setDataSignal?.({
        isLoading: false,
        isError: false,
        statusCode: status,
      });
    },

    onError: (error) => {
      setDataSignal?.({
        isLoading: false,
        isError: true,
        statusCode: error?.message,
      });
    },
  });

  const fetchPage = useCallback(() => {
    const cached = queryClient.getQueryData(queryKey);

    if (cached) {
      setData(cached.data);
      setTotalItems(cached.totalItems);
      setCurrentPage(requestedPage);
      setItemsPerPage(requestedItemsPerPage);
      setOutletNum(requestedPage);

      return;
    }

    setDataSignal?.({ isLoading: true });
    mutate({ url, payload });
  }, [
    mutate,
    payload,
    setDataSignal,
    url,
    queryClient,
    queryKey,
    requestedItemsPerPage,
    requestedPage,
    setOutletNum,
  ]);

  return {
    data,
    totalItems,
    currentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    fetchPage,
    isLoading: isPending,
  };
};

export default useMuiPagServerTwo;
