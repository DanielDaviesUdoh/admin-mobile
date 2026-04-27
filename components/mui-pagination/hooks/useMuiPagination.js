import { useGetData } from "../../../hooks/useGetData";
import { usePostDataTwo } from "../../../hooks/usePostDataTwo";

export const useMuiPagination = (queryKey, url, runFetchData) => {
  return useGetData(queryKey, url, {
    enabled: runFetchData,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMuiPaginationPost = (queryKey, url, payload, runFetchData) => {
  return usePostDataTwo(queryKey, url, payload, {
    enabled: runFetchData,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};
