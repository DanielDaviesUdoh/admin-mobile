import { usePostData } from "../../../../hooks/usePostData";
import { ROUTING_SUBMIT_NETWORKPREFIX_BY_COUNTRYCODE } from "../../../../services/routingEndpoints";

export const usePostNetworkPrefix = (
  queryClient,
  linkTextAddPrefix,
  handleClose,
  setPrefix,
  setShowStatus,
  setShowProgress,
) => {
  return usePostData(ROUTING_SUBMIT_NETWORKPREFIX_BY_COUNTRYCODE, {
    onSuccess: () => {
      setShowStatus(true);
      setShowProgress(false);
      queryClient.invalidateQueries([
        "networkPrefixByCountryCode",
        { countryCode: linkTextAddPrefix },
      ]);
      setTimeout(() => {
        handleClose();
        setPrefix("");
        setShowStatus(false);
      }, 3000);
    },
    onError: () => {
      setShowStatus(true);
      setShowProgress(false);
      setTimeout(() => {
        handleClose();
        setPrefix("");
        setShowStatus(false);
      }, 5000);
    },
  });
};
