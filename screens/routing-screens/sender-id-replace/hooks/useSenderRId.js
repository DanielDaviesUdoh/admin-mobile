import { useDeleteDataThree } from "../../../../hooks/useDeleteDataThree";
import { useGetDataTwo } from "../../../../hooks/useGetDataTwo";
import { usePostData } from "../../../../hooks/usePostData";
import { usePutData } from "../../../../hooks/usePutData";
import {
  DELETE_SENDER_ID_REPLACE_ALL,
  SENDER_ID_REPLACE_ALL,
  SENDER_ID_REPLACE_CLIENT_IDS,
  SENDER_ID_REPLACE_PROVIDERS,
} from "../../../../services/senderIDREndpoints";

export const useGetSenderIdReplace = () => {
  return useGetDataTwo(["senderIdReplace"], SENDER_ID_REPLACE_ALL);
};

export const useGetSIdReplaceClientIds = () => {
  return useGetDataTwo(
    ["senderIdReplaceClientIds"],
    SENDER_ID_REPLACE_CLIENT_IDS,
  );
};

export const useGetSIdReplaceSenderIds = (clientId, initVal) => {
  return useGetDataTwo(
    ["senderIdReplaceSenderIds", { clientId }],
    `${SENDER_ID_REPLACE_ALL}/${clientId}/sender-ids`,
    {
      enabled: !!clientId !== initVal,
    },
  );
};

export const useGetSIdReplaceProviders = () => {
  return useGetDataTwo(
    ["senderIdReplaceProviders"],
    SENDER_ID_REPLACE_PROVIDERS,
  );
};

export const useGetSIdReplaceNetwork = (provider, initVal) => {
  return useGetDataTwo(
    ["senderIdReplaceSenderIds", { provider }],
    `${SENDER_ID_REPLACE_ALL}/${provider}/networks`,
    {
      enabled: !!provider !== initVal,
    },
  );
};

export const usePostSenderIdReplace = (
  queryClient,
  handleCloseEdit,
  setClientId,
  setSenderId,
  setProvider,
  setNetwork,
  setToSender,
  initVal,
  setShowStatus,
  setShowProgress,
) => {
  return usePostData(SENDER_ID_REPLACE_ALL, {
    onSuccess: () => {
      setShowStatus(true);
      setShowProgress(false);
      queryClient.invalidateQueries(["senderIdReplace"]);
      setTimeout(() => {
        handleCloseEdit();
        setClientId(initVal);
        setSenderId(initVal);
        setProvider(initVal);
        setNetwork(initVal);
        setToSender(initVal);
        setShowStatus(false);
      }, 3000);
    },
    onError: () => {
      setShowStatus(true);
      setShowProgress(false);
      setTimeout(() => {
        handleCloseEdit();
        setClientId(initVal);
        setSenderId(initVal);
        setProvider(initVal);
        setNetwork(initVal);
        setToSender(initVal);
        setShowStatus(false);
      }, 5000);
    },
  });
};

export const usePutSenderIdReplace = (
  queryClient,
  handleCloseEdit,
  setClientId,
  setSenderId,
  setProvider,
  setNetwork,
  setToSender,
  initVal,
  setShowStatus,
  setShowProgress,
) => {
  return usePutData(SENDER_ID_REPLACE_ALL, {
    onSuccess: () => {
      setShowStatus(true);
      setShowProgress(false);
      queryClient.invalidateQueries(["senderIdReplace"]);
      setTimeout(() => {
        handleCloseEdit();
        setClientId(initVal);
        setSenderId(initVal);
        setProvider(initVal);
        setNetwork(initVal);
        setToSender(initVal);
        setShowStatus(false);
      }, 3000);
    },
    onError: () => {
      setShowStatus(true);
      setShowProgress(false);
      setTimeout(() => {
        handleCloseEdit();
        setClientId(initVal);
        setSenderId(initVal);
        setProvider(initVal);
        setNetwork(initVal);
        setToSender(initVal);
        setShowStatus(false);
      }, 5000);
    },
  });
};

export const useDeleteSenderIdReplace = (queryClient, setFeedback) => {
  return useDeleteDataThree(DELETE_SENDER_ID_REPLACE_ALL, {
    onSuccess: () => {
      setFeedback((prevFB) => ({ ...prevFB, showProgress: null }));
      queryClient.invalidateQueries(["senderIdReplace"]);
      setTimeout(() => {
        setFeedback((prevFB) => ({
          ...prevFB,
          showStatus: null,
        }));
      }, 3000);
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
