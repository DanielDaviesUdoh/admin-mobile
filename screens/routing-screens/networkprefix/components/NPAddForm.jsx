import { useRoutingCountries } from "@/hooks/useRoutingShared";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { usePostNetworkPrefix } from "../hooks/useNetworkPrefix";
import NPAddFormJSX from "./NPAddFormJSX";

const NPAddForm = ({ linkTextAddPrefix, handleClose, filteredData }) => {
  const [prefix, setPrefix] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const enableButton = prefix.trim() && !showProgress;

  const queryClient = useQueryClient();
  const { mutate, statusCode } = usePostNetworkPrefix(
    queryClient,
    linkTextAddPrefix,
    handleClose,
    setPrefix,
    setShowStatus,
    setShowProgress,
  );

  const { data: countryCode } = useRoutingCountries();

  const networkCodeObj = filteredData?.find(
    (obj) => obj.mccmnc === linkTextAddPrefix,
  );
  const networkLabel = networkCodeObj?.network;
  const ctryCode = networkCodeObj?.country;
  const prefixToDeploy = ctryCode + prefix;

  const defaultCtryPrefixMaxLen = countryCode?.find(
    (ctry) => ctry.code === ctryCode,
  )?.prefixlen;

  const networkPLength =
    defaultCtryPrefixMaxLen && defaultCtryPrefixMaxLen !== 0
      ? defaultCtryPrefixMaxLen
      : 6;
  const maxLength = networkPLength - (ctryCode?.length ?? 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowProgress(true);
    const postItem = {
      mccmnc: linkTextAddPrefix,
      prefix: prefixToDeploy,
    };
    mutate(postItem);
  };

  return (
    <NPAddFormJSX
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      linkTextAddPrefix={linkTextAddPrefix}
      prefix={prefix}
      setPrefix={setPrefix}
      enableButton={enableButton}
      statusCode={statusCode}
      showStatus={showStatus}
      showProgress={showProgress}
      ctryCode={ctryCode}
      maxLength={maxLength}
      networkLabel={networkLabel}
    />
  );
};

export default NPAddForm;
