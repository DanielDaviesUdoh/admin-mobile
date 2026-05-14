import { useDeleteData } from "../../../../hooks/useDeleteData";
import { ROUTING_DELETE_ROUTED_NUMBERS } from "../../../../services/routingEndpoints";

export const useDeleteRoutingLog = (
  queryClient,
  pagQueryKey,
  setRunFetchData,
  setFeedback,
) => {
  return useDeleteData(ROUTING_DELETE_ROUTED_NUMBERS, {
    onSuccess: () => {
      queryClient.invalidateQueries(pagQueryKey);
      setFeedback((prevFB) => ({ ...prevFB, showProgress: null }));
      setTimeout(() => {
        setFeedback((prevFB) => ({
          ...prevFB,
          showStatus: null,
        }));
      }, 3000);
      setRunFetchData(true);
    },
    onError: () => {
      setFeedback((prevFB) => ({ ...prevFB, showProgress: null }));
      setTimeout(() => {
        setFeedback((prevFB) => ({
          ...prevFB,
          showStatus: null,
        }));
      }, 5000);
    },
  });
};
