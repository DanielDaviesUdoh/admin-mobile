import { genDataSet } from "@/constants/menuItems";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  useGetSIdReplaceClientIds,
  useGetSIdReplaceNetwork,
  useGetSIdReplaceProviders,
  useGetSIdReplaceSenderIds,
  usePostSenderIdReplace,
  usePutSenderIdReplace,
} from "../hooks/useSenderRId";
import SIDRFormJSX from "./SIDRFormJSX";

const SIDRForm = ({ handleCloseEdit, isEdit, editObj }) => {
  const initVal = "Search";

  const clientIdVal = isEdit ? editObj["clientId"] : initVal;
  const senderIdVal = isEdit ? editObj["senderId"] : initVal;
  const providerVal = isEdit ? editObj["provider"] : initVal;
  const networkVal = isEdit ? editObj["mccmnc"] : initVal;
  const senderVal = isEdit ? editObj["toSender"] : "";

  const [clientId, setClientId] = useState(clientIdVal);
  const [senderId, setSenderId] = useState(senderIdVal);
  const [provider, setProvider] = useState(providerVal);
  const [network, setNetwork] = useState(networkVal);
  const [toSender, setToSender] = useState(senderVal);
  const [showStatus, setShowStatus] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: postMutate, statusCode: postStatusCode } =
    usePostSenderIdReplace(
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
    );

  const { mutate: putMutate, statusCode: putStatusCode } =
    usePutSenderIdReplace(
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
    );

  const { data: sidrCIdsData, isLoading: sidrCIdsIsLoading } =
    useGetSIdReplaceClientIds();
  const sidrClientIdsData = sidrCIdsData?.clientIds;
  const { data: sidrProvsData, isLoading: sidrProvsIsLoading } =
    useGetSIdReplaceProviders();
  const sidrProvidersData = sidrProvsData?.codes;
  const { data: sidrSIdsData, isLoading: sidrSIdsIsLoading } =
    useGetSIdReplaceSenderIds(clientId, initVal);

  const sidrSenderIdsData = sidrSIdsData?.senderIds;
  const { data: sidrNetData, isLoading: sidrNetIsLoading } =
    useGetSIdReplaceNetwork(provider, initVal);
  const sidrNetworkData = sidrNetData?.mccmncList;

  const clientIdsDataSet =
    isEdit && !sidrClientIdsData
      ? genDataSet([clientId])
      : sidrClientIdsData && sidrClientIdsData?.length > 0
        ? genDataSet([clientId, ...sidrClientIdsData])
        : genDataSet([clientId]);

  const senderIdsDataSet =
    isEdit && !sidrSenderIdsData
      ? genDataSet([senderId])
      : sidrSenderIdsData && sidrSenderIdsData?.length > 0
        ? genDataSet([senderId, ...sidrSenderIdsData])
        : genDataSet([senderId]);

  const providersDataSet =
    isEdit && !sidrProvidersData
      ? genDataSet([provider])
      : sidrProvidersData && sidrProvidersData?.length > 0
        ? genDataSet([provider, ...sidrProvidersData])
        : genDataSet([provider]);

  const networksDataSet =
    isEdit && !sidrNetworkData
      ? genDataSet([network])
      : sidrNetworkData && sidrNetworkData?.length > 0
        ? genDataSet([network, ...sidrNetworkData])
        : genDataSet([network]);

  const isDisabled =
    clientId === initVal ||
    senderId === initVal ||
    provider === initVal ||
    network === initVal ||
    toSender?.trim() === "" ||
    showProgress;

  // const isDisabled = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowProgress(true);
    const postItem = {
      clientId: clientId,
      senderId: senderId,
      provider: provider,
      mccmnc: network,
      toSender: toSender,
    };

    if (isEdit) {
      putMutate(postItem);
    } else {
      postMutate(postItem);
    }
  };

  return (
    <SIDRFormJSX
      handleSubmit={handleSubmit}
      initVal={initVal}
      clientIdsDataSet={clientIdsDataSet}
      senderIdsDataSet={senderIdsDataSet}
      providersDataSet={providersDataSet}
      networksDataSet={networksDataSet}
      senderId={senderId}
      network={network}
      clientId={clientId}
      setClientId={setClientId}
      setSenderId={setSenderId}
      provider={provider}
      setProvider={setProvider}
      setNetwork={setNetwork}
      toSender={toSender}
      setToSender={setToSender}
      handleCloseEdit={handleCloseEdit}
      isEdit={isEdit}
      postStatusCode={postStatusCode}
      putStatusCode={putStatusCode}
      showStatus={showStatus}
      showProgress={showProgress}
      isDisabled={isDisabled}
      sidrCIdsIsLoading={sidrCIdsIsLoading}
      sidrProvsIsLoading={sidrProvsIsLoading}
      sidrSIdsIsLoading={sidrSIdsIsLoading}
      sidrNetIsLoading={sidrNetIsLoading}
    />
  );
};

export default SIDRForm;
