import { useGetData } from "@/hooks/useGetData";
import {
  ROUTING_PREFERREDPROVIDER_ALL,
  ROUTING_PREFERREDPROVIDER_UNMATCHED,
} from "@/services/routingEndpoints";

export const useRoutingPreferredProvAll = (radioValue) => {
  return useGetData(
    ["routingPreferredProvAll"],
    ROUTING_PREFERREDPROVIDER_ALL,
    { enabled: !!radioValue },
  );
};

export const useRoutingPreferredProvUnmatched = (radioValue) => {
  return useGetData(
    ["routingPreferredProvUnmatched"],
    ROUTING_PREFERREDPROVIDER_UNMATCHED,
    { enabled: !!radioValue },
  );
};
