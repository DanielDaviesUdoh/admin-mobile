import { genDotDataSet } from "@/constants/menuItems";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  usePostRoutingSubmitChngProv,
  useRoutingChngReason,
  useRoutingProviderChng,
} from "../../hooks/useProvChangeForm";
import ProvChangeFormJSX from "./ProvChangeFormJSX";

const ProvChangeForm = ({
  data,
  linkTextProvChange,
  handleClose,
  qKey,
  setFetchTrigger,
}) => {
  const fieldsObjects = data?.find(
    (item) => item["phone_prefix"] === linkTextProvChange,
  );
  const {
    country_name: country,
    network,
    mccmnc,
    network_prefix: prefix,
    provider,
  } = fieldsObjects ?? {};

  const [providerChange, setProviderChange] = useState("");
  const [reason, setReason] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const { data: changeProviders } = useRoutingProviderChng(linkTextProvChange);
  const { data: changeReasons } = useRoutingChngReason();

  const provDataSet = genDotDataSet(changeProviders, "provider");
  const reasonDataSet = genDotDataSet(changeReasons, "code");

  const queryClient = useQueryClient();
  const { mutate, statusCode } = usePostRoutingSubmitChngProv(
    queryClient,
    qKey,
    setFetchTrigger,
    handleClose,
    setProviderChange,
    setReason,
    setShowStatus,
    setShowProgress,
  );

  const handleSubmit = async () => {
    setShowProgress(true);
    const postItem = {
      to_provider: providerChange,
      from_provider: provider,
      phone_prefix: linkTextProvChange,
      mccmnc: mccmnc,
      reason: reason,
    };

    mutate(postItem);
  };

  return (
    <ProvChangeFormJSX
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      country={country}
      network={network}
      mccmnc={mccmnc}
      prefix={prefix}
      provDataSet={provDataSet}
      providerChange={providerChange}
      setProviderChange={setProviderChange}
      reasonDataSet={reasonDataSet}
      reason={reason}
      setReason={setReason}
      statusCode={statusCode}
      showStatus={showStatus}
      showProgress={showProgress}
    />
  );
};

export default ProvChangeForm;
