import { useGetDataTwo } from "@/hooks/useGetDataTwo";
import { QUEUES_ARTEMIS_QUEUE_PENDING_ALL } from "@/services/queuesEndpoints";

export const useSmsSendQueues = () => {
  return useGetDataTwo(["smsSendQueues"], QUEUES_ARTEMIS_QUEUE_PENDING_ALL);
};
