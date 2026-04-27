import { useGetData } from "../../../../hooks/useGetData";
import { usePostData } from "../../../../hooks/usePostData";
import {
  ROUTING_NETWORKCOVERAGE_BY_COUNTRYCODE,
  ROUTING_SUBMIT_NETWORKCOVERAGE_BY_COUNTRYCODE,
} from "../../../../services/routingEndpoints";

export const useNetworkCoverageByCountryCode = (countryCode) => {
  return useGetData(
    ["networkCoverageByCountryCode", { countryCode: countryCode }],
    `${ROUTING_NETWORKCOVERAGE_BY_COUNTRYCODE}${countryCode}`,
  );
};

export const usePostRNetworkCoverageByCC = (
  queryClient,
  countryCode,
  setIsModalOpen,
  setClientId,
  setNetworkCode,
  getNCodeInitVal,
  setUnitPrice,
  setCurrency,
  setShowStatus,
) => {
  return usePostData(ROUTING_SUBMIT_NETWORKCOVERAGE_BY_COUNTRYCODE, {
    onSuccess: () => {
      setShowStatus(true);
      queryClient.invalidateQueries([
        "networkCoverageByCountryCode",
        { countryCode: countryCode },
      ]);
      setTimeout(() => {
        setIsModalOpen(false);
        setClientId("tgdf");
        setNetworkCode(getNCodeInitVal());
        setUnitPrice("");
        setCurrency("BIF");
        setShowStatus(false);
      }, 3000);
    },
    onError: () => {
      setShowStatus(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setClientId("tgdf");
        setNetworkCode(getNCodeInitVal());
        setUnitPrice("");
        setCurrency("BIF");
        setShowStatus(false);
      }, 5000);
    },
  });
};
