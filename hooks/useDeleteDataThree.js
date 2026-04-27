import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";

const deleteData = async ({
  url,
  params: { clientId, mccmnc, provider, senderId },
}) => {
  const res = await api.delete(
    `${url}clientId=${clientId}&mccmnc=${mccmnc}&provider=${provider}&senderId=${senderId}`,
  );
  const data = res.data;
  return { status: res.status, data: data };
};

export const useDeleteDataThree = (url, options = {}) => {
  const mutation = useMutation({
    mutationFn: (params) => deleteData({ url, params }),
    ...options,
  });

  const statusCode =
    mutation.error?.message ||
    (mutation.isSuccess ? mutation.data?.status : null);

  return { ...mutation, statusCode };
};
