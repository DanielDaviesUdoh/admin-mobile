import { useDeleteData } from "@/hooks/useDeleteData";
import { ROUTING_DELETE_CHANGE_OTP_PROVIDER } from "@/services/routingEndpoints";


export const useDeleteRoutingSubmitDeleteOtpProv = (
  queryClient,
  qKey,
  setFetchTrigger,
  handleClose,
  setFieldVal,
  country,
  network,
  mccmnc,
  prefix,
  setShowStatus,
  setShowProgress
) => {
  return useDeleteData(ROUTING_DELETE_CHANGE_OTP_PROVIDER, {
    onSuccess: () => {
      setFieldVal((prevFV) => ({
        ...prevFV,
        country: country,
        network: network,
        mccmnc: mccmnc,
        prefix: prefix,
      }));
      setShowStatus(true)
      setShowProgress(false)
      setFetchTrigger(true);//allows a refetch
      queryClient.invalidateQueries(["fetchedData", { qKey: qKey }]);
      setTimeout(() => {
        handleClose();
        setShowStatus(false)
      }, 3000);
    },
    onError: () => {
      setShowStatus(true)
      setShowProgress(false)
      setTimeout(() => {
        handleClose();
        setShowStatus(false)
      }, 5000);
    },
  });
};
