import { useGetData } from "@/hooks/useGetData";
import {
  ROUTING_DESIGNATED_PROVIDER,
  ROUTING_LONGMESSAGE_PROVIDER,
} from "@/services/routingEndpoints";


export const useFetchedData = (qKey, endpoint, fetchTrigger) => {
  return useGetData(["fetchedData", { qKey: qKey }], endpoint, {
    enabled: fetchTrigger,
  });
};

export const useDesgProvData = (fieldProvider, fetchTrigger) => {
  return useGetData(
    ["desgProvData", { fieldProvider }],
    `${ROUTING_DESIGNATED_PROVIDER}${fieldProvider}`,
    { enabled: fetchTrigger }
  );
};

export const useLongMesgProvData = (fieldProvider, fetchTrigger) => {
  return useGetData(
    ["longMesgProvData", { fieldProvider }],
    `${ROUTING_LONGMESSAGE_PROVIDER}${fieldProvider}`,
    {enabled: fetchTrigger,}
  );
};
