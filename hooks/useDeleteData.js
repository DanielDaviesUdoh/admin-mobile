import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";

const deleteData = async ({ url, id }) => {
  const res = await api.delete(`${url}${id}`);
  const data = res.data;
  return { status: res.status, data: data.response };
};

export const useDeleteData = (url, options = {}) => {
  const mutation = useMutation({
    mutationFn: (id) => deleteData({ url, id }),
    ...options,
  });

  const statusCode =
    mutation.error?.message ||
    (mutation.isSuccess ? mutation.data?.status : null);

  return { ...mutation, statusCode };
};
