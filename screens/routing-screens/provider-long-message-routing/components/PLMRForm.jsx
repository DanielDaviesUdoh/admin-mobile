import { genDataSet } from "@/constants/menuItems";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { genCurNetDataSet } from "../constants/plmrMenuItems";
import {
  usePostRoutingAddLongMesgProv,
  usePutRoutingAddLongMesgProv,
} from "../hooks/useProvLMR";
import PLMRFormJSX from "./PLMRFormJSX";

const PLMRForm = ({
  handleCloseEdit,
  activeProvData,
  networkLAllData,
  activeProvIsLoading,
  networkLAllIsLoading,
  isEdit,
  editObj,
}) => {
  const initProvider = "Select";
  const initMccmnc = {
    mccmnc: "Select",
    network: "",
    country_name: "",
  };

  const isEditMccmnc = isEdit && editObj?.["mccmnc"];
  const isEditMccmncObj = networkLAllData?.find(
    (obj) => obj.mccmnc === isEditMccmnc,
  );

  const curProviderVal = isEdit ? editObj["provider"] : initProvider;
  const curNetworkVal = isEdit ? isEditMccmncObj : initMccmnc;

  const sendLongMsgVal = isEdit ? editObj["msg_len"] : "160";
  const longMsgProviderVal = isEdit
    ? editObj["over_160_char_provider"]
    : initProvider;

  const [curProvider, setCurProvider] = useState(curProviderVal);
  const [curNetwork, setCurNetwork] = useState(curNetworkVal?.mccmnc);
  const [sendLongMsg, setSendLongMsg] = useState(sendLongMsgVal);
  const [longMsgProvider, setLongMsgProvider] = useState(longMsgProviderVal);
  const [showStatus, setShowStatus] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: postMutate, statusCode: postStatusCode } =
    usePostRoutingAddLongMesgProv(
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
    );

  const { mutate: putMutate, statusCode: putStatusCode } =
    usePutRoutingAddLongMesgProv(
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
    );

  const activeProviders = activeProvData?.map((item) => item.provider);

  const curNetworkDataSet =
    networkLAllData?.length > 0
      ? genCurNetDataSet([curNetworkVal, ...networkLAllData])
      : genCurNetDataSet([curNetworkVal]);

  const curProviderDataSet =
    activeProviders?.length > 0
      ? genDataSet([curProviderVal, ...activeProviders])
      : genDataSet([curProviderVal]);
  const longMsgProviderDataSet =
    activeProviders?.length > 0
      ? genDataSet([longMsgProviderVal, ...activeProviders])
      : genDataSet([longMsgProviderVal]);

  const isDisabled =
    curProvider === "Select" ||
    curNetwork === "Select" ||
    !sendLongMsgVal ||
    longMsgProvider === "Select" ||
    showProgress;

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowProgress(true);
    const postItem = {
      provider: curProvider,
      mccmnc: curNetwork,
      over160CharProvider: longMsgProvider,
      msgLen: sendLongMsg,
    };

    if (isEdit) {
      putMutate(postItem);
    } else {
      postMutate(postItem);
    }
  };

  return (
    <PLMRFormJSX
      handleSubmit={handleSubmit}
      handleCloseEdit={handleCloseEdit}
      curProviderDataSet={curProviderDataSet}
      curNetworkDataSet={curNetworkDataSet}
      longMsgProviderDataSet={longMsgProviderDataSet}
      activeProvIsLoading={activeProvIsLoading}
      networkLAllIsLoading={networkLAllIsLoading}
      curProvider={curProvider}
      setCurProvider={setCurProvider}
      isEdit={isEdit}
      curNetwork={curNetwork}
      setCurNetwork={setCurNetwork}
      sendLongMsg={sendLongMsg}
      setSendLongMsg={setSendLongMsg}
      longMsgProvider={longMsgProvider}
      setLongMsgProvider={setLongMsgProvider}
      postStatusCode={postStatusCode}
      putStatusCode={putStatusCode}
      showStatus={showStatus}
      showProgress={showProgress}
      isDisabled={isDisabled}
    />
  );
};

export default PLMRForm;
