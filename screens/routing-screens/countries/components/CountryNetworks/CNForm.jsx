import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { usePostRoutingNetworksByCC } from "../../hooks/useCtryNet";
import CNFormJSX from "./CNFormJSX";

const CNForm = ({ data, handleClose, countryCode, linkTextCtryNetworks }) => {
  const [nCode, setNCode] = useState("");
  const [nName, setNName] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const enableButton = nCode?.trim() && nName?.trim() && !showProgress;

  const ctryNetObject = data?.find(
    (obj) => obj.mccmnc === linkTextCtryNetworks,
  );
  const {
    country_name: countryName,
    mccmnc: networkCode,
    network: networkName,
  } = ctryNetObject ?? {};

  const mcc = networkCode?.slice(0, 3);
  const deployedNCode = mcc + nCode;

  const queryClient = useQueryClient();
  const { mutate, statusCode } = usePostRoutingNetworksByCC(
    queryClient,
    countryCode,
    handleClose,
    setNCode,
    setNName,
    setShowStatus,
    setShowProgress,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowProgress(true);
    const postItem = {
      country: countryCode,
      mccmnc: deployedNCode,
      name: nName,
    };
    mutate(postItem);
  };

  return (
    <CNFormJSX
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      countryName={countryName}
      mcc={mcc}
      networkName={networkName}
      nCode={nCode}
      setNCode={setNCode}
      nName={nName}
      setNName={setNName}
      enableButton={enableButton}
      statusCode={statusCode}
      showStatus={showStatus}
      showProgress={showProgress}
    />
  );
};

export default CNForm;
