import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRoutingCountries } from "../../../../../hooks/useRoutingShared";
import { usePostRNetworkPrefixByCC } from "../../hooks/useCtryNetPrefix";
import CNPFormJSX from "./CNPFormJSX";

const CNPForm = ({
  data,
  handleClose,
  countryCode,
  linkTextCtryNetworkPrefix,
}) => {
  const [prefix, setPrefix] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const enableButton = prefix?.trim() && !showProgress;

  const queryClient = useQueryClient();
  const { mutate, statusCode } = usePostRNetworkPrefixByCC(
    queryClient,
    countryCode,
    handleClose,
    setPrefix,
    setShowStatus,
    setShowProgress,
  );

  const { data: CountriesData } = useRoutingCountries();
  const prefixToDeploy = countryCode + prefix;

  const networkCodeObj = data?.find(
    (obj) => obj.mccmnc === linkTextCtryNetworkPrefix,
  );
  const networkLabel = networkCodeObj?.network;

  const defaultCtryPrefixMaxLen = CountriesData?.find(
    (ctry) => ctry.code === countryCode,
  )?.prefixlen;

  const networkPLength =
    defaultCtryPrefixMaxLen && defaultCtryPrefixMaxLen !== 0
      ? defaultCtryPrefixMaxLen
      : 6;
  const maxLength = networkPLength - (countryCode?.length ?? 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowProgress(true);
    const postItem = {
      mccmnc: linkTextCtryNetworkPrefix,
      prefix: prefixToDeploy,
    };
    mutate(postItem);
  };

  return (
    <CNPFormJSX
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      prefix={prefix}
      setPrefix={setPrefix}
      enableButton={enableButton}
      statusCode={statusCode}
      showStatus={showStatus}
      showProgress={showProgress}
      networkLabel={networkLabel}
      linkTextCtryNetworkPrefix={linkTextCtryNetworkPrefix}
      ctryCode={countryCode}
      maxLength={maxLength}
    />
  );
};

export default CNPForm;
