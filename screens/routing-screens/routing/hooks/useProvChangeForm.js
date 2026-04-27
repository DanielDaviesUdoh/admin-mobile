import { useGetData } from "@/hooks/useGetData";
import { usePostData } from "@/hooks/usePostData";
import {
  ROUTING_CHANGE_PROVIDER,
  ROUTING_CHANGE_REASON,
  ROUTING_SUBMIT_CHANGE_PROVIDER,
} from "@/services/routingEndpoints";

export const useRoutingProviderChng = (phonePrefix) => {
  return useGetData(
    ["routingProviderChng", { phonePrefix: phonePrefix }],
    `${ROUTING_CHANGE_PROVIDER}${phonePrefix}`,
    { staleTime: 1000 * 60 * 5 },
  );
};

export const useRoutingChngReason = () => {
  return useGetData(["routingChngReason"], ROUTING_CHANGE_REASON, {
    staleTime: 1000 * 60 * 5,
  });
};

export const usePostRoutingSubmitChngProv = (
  queryClient,
  qKey,
  setFetchTrigger,
  handleClose,
  setProviderChange,
  setReason,
  setShowStatus,
  setShowProgress,
) => {
  return usePostData(ROUTING_SUBMIT_CHANGE_PROVIDER, {
    onSuccess: () => {
      setShowStatus(true);
      setShowProgress(false);
      setFetchTrigger(true); //allows a refetch
      queryClient.invalidateQueries(["fetchedData", { qKey: qKey }]);
      setTimeout(() => {
        handleClose();
        setProviderChange("");
        setReason("");
        setShowStatus(false);
      }, 3000);
    },
    onError: () => {
      setShowStatus(true);
      setShowProgress(false);
      setTimeout(() => {
        handleClose();
        setProviderChange("");
        setReason("");
        setShowStatus(false);
      }, 5000);
    },
  });
};
