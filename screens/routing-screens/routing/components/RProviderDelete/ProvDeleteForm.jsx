import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDeleRoutingSubmitChngProv } from "../../hooks/useProvDeleteForm";
import ProvDeleteFormJSX from "./ProvDeleteFormJSX";

const ProvDeleteForm = ({
  data,
  linkTextProvDelete,
  handleClose,
  qKey,
  setFetchTrigger,
}) => {
  const fieldsObjects = data?.find(
    (item) => item["phone_prefix"] === linkTextProvDelete,
  );
  const {
    country_name: country,
    network,
    mccmnc,
    network_prefix: prefix,
  } = fieldsObjects ?? {};

  const [fieldVal, setFieldVal] = useState({
    country: "",
    network: "",
    mccmnc: "",
    prefix: "",
  });
  const [showStatus, setShowStatus] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, statusCode } = useDeleRoutingSubmitChngProv(
    queryClient,
    qKey,
    setFetchTrigger,
    handleClose,
    setFieldVal,
    country,
    network,
    mccmnc,
    prefix,
    setShowStatus,
    setShowProgress,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowProgress(true);
    mutate(linkTextProvDelete);
  };

  return (
    <ProvDeleteFormJSX
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      fieldVal={fieldVal}
      country={country}
      network={network}
      mccmnc={mccmnc}
      prefix={prefix}
      statusCode={statusCode}
      showStatus={showStatus}
      showProgress={showProgress}
    />
  );
};

export default ProvDeleteForm;
