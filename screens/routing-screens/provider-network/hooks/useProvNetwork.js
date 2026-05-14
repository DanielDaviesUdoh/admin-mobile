import { useGetData } from "@/hooks/useGetData";
import { ROUTING_PROVIDER_NETWORK } from "@/services/routingEndpoints";

export const useProviderNetwork = () => {
  return useGetData(["providerNetwork"], ROUTING_PROVIDER_NETWORK, {
    // staleTime: 1000 * 60 * 5,
  });
};
