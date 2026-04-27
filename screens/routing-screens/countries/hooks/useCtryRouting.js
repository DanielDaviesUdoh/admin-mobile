import { useGetData } from "../../../../hooks/useGetData";
import { usePostData } from "../../../../hooks/usePostData";
import {
  ROUTING_BY_COUNTRY,
  ROUTING_SUBMIT_COUNTRYROUTING_BY_COUNTRYCODE,
} from "../../../../services/routingEndpoints";

export const useRoutingByCountry = (countryCode) => {
  return useGetData(
    ["routingByCountry", { countryCode: countryCode }],
    `${ROUTING_BY_COUNTRY}${countryCode}`,
  );
};

export const usePostRoutingCountryByCC = (
  queryClient,
  countryCode,
  handleClose,
  setNetworkPrefix,
  initNetPrefix,
  setProvider,
  initProv,
  setShowStatus,
  setShowProgress,
) => {
  return usePostData(ROUTING_SUBMIT_COUNTRYROUTING_BY_COUNTRYCODE, {
    onSuccess: () => {
      setShowStatus(true);
      setShowProgress(false);
      queryClient.invalidateQueries([
        "routingByCountry",
        { countryCode: countryCode },
      ]);
      setTimeout(() => {
        handleClose();
        setNetworkPrefix(initNetPrefix);
        setProvider(initProv.provider);
        setShowStatus(false);
      }, 3000);
    },
    onError: () => {
      setShowStatus(true);
      setShowProgress(false);
      setTimeout(() => {
        handleClose();
        setNetworkPrefix(initNetPrefix);
        setProvider(initProv.provider);
        setShowStatus(false);
      }, 5000);
    },
  });
};
