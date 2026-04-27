import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDeleteRoutingSubmitDeleteOtpProv } from "../../hooks/useOtpDeleteForm";
import OTPDeleteFormJSX from "./OTPDeleteFormJSX";

const OtpDeleteForm = ({
  data,
  linkTextOtpDelete,
  handleClose,
  qKey,
  setFetchTrigger,
}) => {
  const fieldsObjects = data?.find(
    (item) => item["phone_prefix"] === linkTextOtpDelete,
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
  const { mutate, statusCode } = useDeleteRoutingSubmitDeleteOtpProv(
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

  const handleSubmit = async () => {
    setShowProgress(true);
    mutate(linkTextOtpDelete);
  };

  return (
    <OTPDeleteFormJSX
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

export default OtpDeleteForm;
