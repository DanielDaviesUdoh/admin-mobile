import { useGetData } from "@/hooks/useGetData";
import { usePostData } from "@/hooks/usePostData";
import {
  ROUTING_CHANGE_OTP_PROVIDER,
  ROUTING_SUBMIT_CHANGE_OTP_PROVIDER,
} from "@/services/routingEndpoints";

export const useRoutingProviderChngOtp = (phonePrefix, provider) => {
  return useGetData(
    ["routingProviderChngOtp", { phonePrefix, provider }],
    `${ROUTING_CHANGE_OTP_PROVIDER}?phone-prefix=${phonePrefix}&provider=${provider}`,
    { staleTime: 1000 * 60 * 5 }
  );
};

export const usePostRoutingSubmitChngOtpProv = (
  queryClient,
  qKey,
  setFetchTrigger,
  handleClose,
  setProviderChange,
  setShowStatus,
  setShowProgress
) => {
  return usePostData(ROUTING_SUBMIT_CHANGE_OTP_PROVIDER, {
    onSuccess: () => {
      setShowStatus(true)
      setShowProgress(false)
      setFetchTrigger(true); //allows a refetch
      queryClient.invalidateQueries(["fetchedData", { qKey: qKey }]);
      setTimeout(() => {
        handleClose();
        setProviderChange("");
        setShowStatus(false)
      }, 3000);
    },
    onError: () => {
      setShowStatus(true)
      setShowProgress(false)
      setTimeout(() => {
        handleClose();
        setProviderChange("");
        setShowStatus(false)
      }, 5000);
    },
  });
};
