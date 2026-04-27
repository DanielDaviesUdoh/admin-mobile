import { useGetData } from "../../../../hooks/useGetData";
import { usePostData } from "../../../../hooks/usePostData";
import {
  ROUTING_NETWORKS_BY_COUNTRYCODE,
  ROUTING_SUBMIT_NETWORKS_BY_COUNTRYCODE,
} from "../../../../services/routingEndpoints";

export const useNetworksByCountryCode = (countryCode) => {
  return useGetData(
    ["networksByCountryCode", { countryCode: countryCode }],
    `${ROUTING_NETWORKS_BY_COUNTRYCODE}${countryCode}`,
  );
};

export const usePostRoutingNetworksByCC = (
  queryClient,
  countryCode,
  handleClose,
  setNCode,
  setNName,
  setShowStatus,
  setShowProgress,
) => {
  return usePostData(ROUTING_SUBMIT_NETWORKS_BY_COUNTRYCODE, {
    onSuccess: () => {
      setShowStatus(true);
      setShowProgress(false);
      queryClient.invalidateQueries([
        "networksByCountryCode",
        { countryCode: countryCode },
      ]);
      setTimeout(() => {
        handleClose();
        setNCode("");
        setNName("");
        setShowStatus(false);
      }, 3000);
    },
    onError: () => {
      setShowStatus(true);
      setShowProgress(false);
      setTimeout(() => {
        handleClose();
        setNCode("");
        setNName("");
        setShowStatus(false);
      }, 5000);
    },
  });
};
