import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

const putData = async ({ url, payload }) => {
  const res = await api.put(url, payload);
  const data = res.data;
  return { status: res.status, data: data.response };
};

export const usePutData = (url, options = {}) => {
  const mutation = useMutation({
    mutationFn: (payload) => putData({ url, payload }),
    ...options,
  });

  const statusCode =
    mutation.error?.message ||
    (mutation.isSuccess ? mutation.data?.status : null);

  return { ...mutation, statusCode };
};
