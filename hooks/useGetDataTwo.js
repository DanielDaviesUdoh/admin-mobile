import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const getData = async (url) => {
  const res = await api.get(url);
  const data = res.data;
  return { status: res.status, data: data };
};

export const useGetDataTwo = (queryKey, url, options = {}) => {
  const { data, isError, error, isLoading, isSuccess, isFetching, refetch } =
    useQuery({
      queryKey: queryKey,
      queryFn: () => getData(url),
      ...options,
    });

  const statusCode = error?.message || (isSuccess ? data?.status : null);

  return {
    data: data?.data,
    statusCode,
    isError,
    error,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  };
};
