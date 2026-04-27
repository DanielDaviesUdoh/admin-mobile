import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";

const postData = async ({ url, payload }) => {
  const res = await api.post(url, payload);
  const data = res.data;
  return { status: res.status, data: data.response };
};

export const usePostData = (url, options = {}) => {
  const mutation = useMutation({
    mutationFn: (payload) => postData({ url, payload }),
    ...options, 
  });

  const statusCode =
    mutation.error?.message ||
    (mutation.isSuccess ? mutation.data?.status : null);

  return { ...mutation, statusCode };
};
