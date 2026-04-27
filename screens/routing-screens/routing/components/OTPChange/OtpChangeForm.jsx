import { genDotDataSet } from "@/constants/menuItems";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  usePostRoutingSubmitChngOtpProv,
  useRoutingProviderChngOtp,
} from "../../hooks/useOtpChangeForm";
import OtpChangeFormJSX from "./OtpChangeFormJSX";

const OtpChangeForm = ({
  data,
  linkTextOtpChange,
  handleClose,
  qKey,
  setFetchTrigger,
}) => {
  const fieldsObjects = data?.find(
    (item) => item["phone_prefix"] === linkTextOtpChange,
  );
  const {
    country_name: country,
    network,
    mccmnc,
    network_prefix: prefix,
    provider,
  } = fieldsObjects ?? {};

  const [providerChange, setProviderChange] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const { data: activeProviders } = useRoutingProviderChngOtp(
    linkTextOtpChange,
    provider,
  );
  const otpProvDataSet = genDotDataSet(activeProviders, "provider");

  const queryClient = useQueryClient();
  const { mutate, statusCode } = usePostRoutingSubmitChngOtpProv(
    queryClient,
    qKey,
    setFetchTrigger,
    handleClose,
    setProviderChange,
    setShowStatus,
    setShowProgress,
  );

  const handleSubmit = async () => {
    setShowProgress(true);
    const postItem = {
      provider: providerChange,
      phone_prefix: linkTextOtpChange,
    };
    mutate(postItem);
  };

  return (
    <OtpChangeFormJSX
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      country={country}
      network={network}
      mccmnc={mccmnc}
      prefix={prefix}
      otpProvDataSet={otpProvDataSet}
      providerChange={providerChange}
      setProviderChange={setProviderChange}
      statusCode={statusCode}
      showStatus={showStatus}
      showProgress={showProgress}
    />
  );
};

export default OtpChangeForm;
