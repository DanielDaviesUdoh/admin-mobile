import { usePostData } from "../../../../hooks/usePostData";
import { ROUTING_NUMBERROUTING_SUBMIT } from "../../../../services/routingEndpoints";

export const usePostNumberRouting = (
  queryClient,
  qKey,
  setFetchTrigger,
  handleClose,
  initProv,
  initPrefix,
  setPrefixes,
  setProvider,
  setShowStatus,
  setShowProgress,
) => {
  return usePostData(ROUTING_NUMBERROUTING_SUBMIT, {
    onSuccess: () => {
      setShowStatus(true);
      setShowProgress(false);
      setFetchTrigger(true);
      queryClient.invalidateQueries(["fetchedData", { qKey: qKey }]);
      setTimeout(() => {
        handleClose();
        setPrefixes(initPrefix);
        setProvider(initProv.provider);
        setShowStatus(false);
      }, 3000);
    },
    onError: () => {
      setShowStatus(true);
      setShowProgress(false);
      setTimeout(() => {
        handleClose();
        setPrefixes(initPrefix);
        setProvider(initProv.provider);
        setShowStatus(false);
      }, 5000);
    },
  });
};
