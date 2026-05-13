import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { usePostRoutingCountryByCC } from "../../hooks/useCtryRouting";
import CRFormJSX from "./CRFormJSX";

import { genDataSet, genDotDataSet } from "@/constants/menuItems";
import { useRoutingCountries } from "../../../../../hooks/useRoutingShared";

const CRForm = ({
  data,
  handleClose,
  providerData,
  countryCode,
  linkTextCtryRoute,
}) => {
  const initNetPrefix = "Pick a network prefix";
  const initProv = { provider: "Pick a network provider" };

  const [networkPrefix, setNetworkPrefix] = useState(initNetPrefix);
  const [extraPrefix, setExtraPrefix] = useState("");
  const [provider, setProvider] = useState(initProv.provider);
  const [showStatus, setShowStatus] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const selectedPrefix = networkPrefix !== initNetPrefix ? networkPrefix : "";
  const phonePrefix = selectedPrefix + extraPrefix;

  const enableButton =
    networkPrefix !== initNetPrefix &&
    extraPrefix?.trim() &&
    provider !== initProv.provider &&
    !showProgress;

  const queryClient = useQueryClient();
  const { data: countriesData } = useRoutingCountries();
  const { mutate, statusCode } = usePostRoutingCountryByCC(
    queryClient,
    countryCode,
    handleClose,
    setNetworkPrefix,
    initNetPrefix,
    setProvider,
    initProv,
    setShowStatus,
    setShowProgress,
  );

  const ctryNetworks = data?.filter((obj) => obj.network === linkTextCtryRoute);
  const nPrefix = ctryNetworks?.map((obj) => obj["network_prefix"]);
  const uniqueNPrefix = nPrefix && [...new Set(nPrefix)];

  const netPrefixDataSet =
    uniqueNPrefix?.length > 0
      ? genDataSet([initNetPrefix, ...uniqueNPrefix])
      : genDataSet([initNetPrefix]);

  const provDataSet =
    providerData?.length > 0
      ? genDotDataSet([initProv, ...providerData], "provider")
      : genDotDataSet([initProv], "provider");
  const defaultCtryMaxLength = countriesData?.find(
    (ctry) => ctry.code === countryCode,
  )?.phonelen;

  const ctryMaxLength =
    defaultCtryMaxLength && defaultCtryMaxLength !== 0
      ? defaultCtryMaxLength
      : 13;
  const maxLength = ctryMaxLength - (selectedPrefix?.length ?? 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowProgress(true);
    const postItem = {
      phone_prefix: phonePrefix,
      network_prefix: networkPrefix,
      provider: provider,
    };
    mutate(postItem);
  };

  return (
    <CRFormJSX
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      networkPrefix={networkPrefix}
      provider={provider}
      netPrefixDataSet={netPrefixDataSet}
      provDataSet={provDataSet}
      setNetworkPrefix={setNetworkPrefix}
      selectedPrefix={selectedPrefix}
      extraPrefix={extraPrefix}
      setExtraPrefix={setExtraPrefix}
      setProvider={setProvider}
      enableButton={enableButton}
      statusCode={statusCode}
      showStatus={showStatus}
      showProgress={showProgress}
      maxLength={maxLength}
    />
  );
};

export default CRForm;
