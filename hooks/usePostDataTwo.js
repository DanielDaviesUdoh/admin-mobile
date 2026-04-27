// import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const postData = async ({ url, payload }) => {
  const res = await api.post(url, payload);
  const data = res.data;
  return { status: res.status, data: data };
};

export const usePostDataTwo = (queryKey, url, payload, options = {}) => {
  const { data, isError, error, isLoading, isSuccess, isFetching, refetch } =
    useQuery({
      queryKey: queryKey,
      queryFn: () => postData({ url, payload }),
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

// export const usePostDataTwo = ( options = {}) => {
//   const mutation = useMutation({
//     mutationFn: ({url, payload}) => postData({ url, payload }),
//     ...options,
//   });

//   const statusCode =
//     mutation.error?.message ||
//     (mutation.isSuccess ? mutation.data?.status : null);

//   return { ...mutation, statusCode };
// };
