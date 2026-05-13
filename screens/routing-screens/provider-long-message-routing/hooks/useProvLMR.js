import { useDeleteDataTwo } from "@/hooks/useDeleteDataTwo";
import { useGetData } from "@/hooks/useGetData";
import { usePostData } from "@/hooks/usePostData";
import { usePutData } from "@/hooks/usePutData";
import {
  ROUTING_ADD_LONGMESSAGE_PROVIDER,
  ROUTING_DELETE_LONGMESSAGE_PROVIDER,
  ROUTING_LONGMESSAGE_PROVIDER_ALL,
} from "@/services/routingEndpoints";

export const useLongMessageProvAll = () => {
  return useGetData(["longMessageProvAll"], ROUTING_LONGMESSAGE_PROVIDER_ALL, {
    // staleTime: 1000 * 60 * 5,
  });
};

export const usePostRoutingAddLongMesgProv = (
  initProvider,
  initMccmnc,
  queryClient,
  handleCloseEdit,
  setCurProvider,
  setCurNetwork,
  setSendLongMsg,
  setLongMsgProvider,
  setShowStatus,
  setShowProgress,
) => {
  return usePostData(ROUTING_ADD_LONGMESSAGE_PROVIDER, {
    onSuccess: () => {
      setShowStatus(true);
      setShowProgress(false);
      queryClient.invalidateQueries(["longMessageProvAll"]);
      setTimeout(() => {
        handleCloseEdit();
        setCurProvider(initProvider);
        setCurNetwork(initMccmnc);
        setSendLongMsg("160");
        setLongMsgProvider(initProvider);
        setShowStatus(false);
      }, 3000);
    },
    onError: () => {
      setShowStatus(true);
      setShowProgress(false);
      setTimeout(() => {
        handleCloseEdit();
        setCurProvider(initProvider);
        setCurNetwork(initMccmnc);
        setSendLongMsg("160");
        setLongMsgProvider(initProvider);
        setShowStatus(false);
      }, 5000);
    },
  });
};

export const usePutRoutingAddLongMesgProv = (
  initProvider,
  initMccmnc,
  queryClient,
  handleCloseEdit,
  setCurProvider,
  setCurNetwork,
  setSendLongMsg,
  setLongMsgProvider,
  setShowStatus,
  setShowProgress,
) => {
  return usePutData(ROUTING_ADD_LONGMESSAGE_PROVIDER, {
    onSuccess: () => {
      setShowStatus(true);
      setShowProgress(false);
      queryClient.invalidateQueries(["longMessageProvAll"]);
      setTimeout(() => {
        handleCloseEdit();
        setCurProvider(initProvider);
        setCurNetwork(initMccmnc);
        setSendLongMsg("160");
        setLongMsgProvider(initProvider);
        setShowStatus(false);
      }, 3000);
    },
    onError: () => {
      setShowStatus(true);
      setShowProgress(false);
      setTimeout(() => {
        handleCloseEdit();
        setCurProvider(initProvider);
        setCurNetwork(initMccmnc);
        setSendLongMsg("160");
        setLongMsgProvider(initProvider);
        setShowStatus(false);
      }, 5000);
    },
  });
};

export const useDeleteLongMessageProv = (queryClient, setFeedback) => {
  return useDeleteDataTwo(ROUTING_DELETE_LONGMESSAGE_PROVIDER, {
    onSuccess: () => {
      setFeedback((prevFB) => ({ ...prevFB, showProgress: null }));
      setTimeout(() => {
        setFeedback((prevFB) => ({
          ...prevFB,
          showStatus: null,
        }));
      }, 3000);
      queryClient.invalidateQueries(["longMessageProvAll"]);
    },
    onError: () => {
      setFeedback((prevFB) => ({ ...prevFB, showProgress: null }));
      setTimeout(() => {
        setFeedback((prevFB) => ({
          ...prevFB,
          showStatus: null,
        }));
      }, 5000);
    },
  });
};
