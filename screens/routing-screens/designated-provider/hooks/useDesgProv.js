import { useDeleteDataTwo } from "../../../../hooks/useDeleteDataTwo";
import { useGetData } from "../../../../hooks/useGetData";
import {
  ROUTING_DELETE_DESIGNATED_PROVIDER,
  ROUTING_DESIGNATED_PROVIDER_ALL,
} from "../../../../services/routingEndpoints";

export const useDesignatedProvAll = () => {
  return useGetData(["designatedProvAll"], ROUTING_DESIGNATED_PROVIDER_ALL, {
    // staleTime: 1000 * 60 * 5,
  });
};

export const useDeleteDesgProv = (queryClient, setFeedback) => {
  return useDeleteDataTwo(ROUTING_DELETE_DESIGNATED_PROVIDER, {
    onSuccess: () => {
      setFeedback((prevFB) => ({ ...prevFB, showProgress: null }));
      setTimeout(() => {
        setFeedback((prevFB) => ({
          ...prevFB,
          showStatus: null,
        }));
      }, 3000);
      queryClient.invalidateQueries(["designatedProvAll"]);
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
