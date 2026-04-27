import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";

const deleteData = async ({ url, dataBody }) => {
  const res = await api.delete(`${url}`, { data: dataBody });
  const data = res.data;
  return { status: res.status, data: data.response };
};

export const useDeleteDataTwo = (url, options = {}) => {
  const mutation = useMutation({
    mutationFn: (dataBody) => deleteData({ url, dataBody }),
    ...options,
  });

  const statusCode =
    mutation.error?.message ||
    (mutation.isSuccess ? mutation.data?.status : null);

  return { ...mutation, statusCode };
};
