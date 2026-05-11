import { genDotDataSet } from "@/constants/menuItems";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  usePostRoutingSubmitChngOtpProv,
  useRoutingProviderAddOtp,
} from "../../hooks/useOtpAddForm";
import OTPAddFormJSX from "./OTPAddFormJSX";

export default function OtpAddForm({
  data,
  linkTextOtpAdd,
  handleClose,
  qKey,
  setFetchTrigger,
}) {
  const fieldsObjects = data?.find(
    (item) => item["phone_prefix"] === linkTextOtpAdd,
  );
  const {
    country_name: country,
    network,
    mccmnc,
    network_prefix: prefix,
  } = fieldsObjects ?? {};

  const initProv = { provider: "Select" };

  const [providerChange, setProviderChange] = useState(initProv.provider);
  const [showStatus, setShowStatus] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const { data: activeProviders } = useRoutingProviderAddOtp(linkTextOtpAdd);

  const otpProvDataSet =
    activeProviders && activeProviders?.length > 0
      ? genDotDataSet([initProv, ...activeProviders], "provider")
      : genDotDataSet([initProv], "provider");

  const queryClient = useQueryClient();
  const { mutate, statusCode } = usePostRoutingSubmitChngOtpProv(
    queryClient,
    qKey,
    setFetchTrigger,
    handleClose,
    initProv,
    setProviderChange,
    setShowStatus,
    setShowProgress,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowProgress(true);
    const postItem = {
      provider: providerChange,
      phone_prefix: linkTextOtpAdd,
    };
    mutate(postItem);
  };

  return (
    <OTPAddFormJSX
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      country={country}
      network={network}
      mccmnc={mccmnc}
      prefix={prefix}
      initProv={initProv}
      otpProvDataSet={otpProvDataSet}
      providerChange={providerChange}
      setProviderChange={setProviderChange}
      statusCode={statusCode}
      showStatus={showStatus}
      showProgress={showProgress}
    />
  );
}
