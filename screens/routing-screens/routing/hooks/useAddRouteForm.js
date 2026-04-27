import { useGetData } from "@/hooks/useGetData";
import { usePostData } from "@/hooks/usePostData";
import {
  ROUTING_CHANGE_PROVIDER,
  ROUTING_NETPREFIX_NOT_IN_ROUTING,
  ROUTING_SUBMIT_CHANGE_PROVIDER,
} from "@/services/routingEndpoints";

export const useGetPrefixData = (mccmnc, network) => {
  return useGetData(
    ["getPrefixData", { mccmnc: mccmnc }],
    `${ROUTING_NETPREFIX_NOT_IN_ROUTING}${mccmnc}`,
    { enabled: !!network }
  );
};

export const useGetProviderData = (prefix) => {
  return useGetData(
    ["getProviderData", { prefix: prefix }],
    `${ROUTING_CHANGE_PROVIDER}${prefix}`,
    { enabled: !!prefix }
  );
};

// ROUTING_SUBMIT_CHANGE_PROVIDER is a placeholder for the undone endpoint

export const usePostAddRoute = (
  setIsModalOpen,
  setCountry,
  setNetwork,
  setPrefix,
  setProvider,
  setShowStatus
) => {
  return usePostData(ROUTING_SUBMIT_CHANGE_PROVIDER, {
    onSuccess: () => {
      setShowStatus(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setCountry("");
        setNetwork("");
        setPrefix("");
        setProvider("");
        setShowStatus(false);
      }, 3000);
    },
    onError: () => {
      setShowStatus(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setCountry("");
        setNetwork("");
        setPrefix("");
        setProvider("");
        setShowStatus(false);
      }, 5000);
    },
  });
};
