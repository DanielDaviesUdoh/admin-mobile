import { genDataSet, genDotDataSet } from "@/constants/menuItems";
import {
  useRoutingActiveProviders,
  useRoutingCountries,
} from "@/hooks/useRoutingShared";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { usePostNumberRouting } from "../../hooks/useNumRouting";
import AddNumRFormJSX from "./AddNumRFormJSX";

const AddNumRForm = ({
  data,
  linkTextAddNumRouting,
  handleClose,
  qKey,
  setFetchTrigger,
}) => {
  const objectType = data?.find(
    (item) => item["mccmnc"] === linkTextAddNumRouting,
  );
  const objectArray = data?.filter(
    (item) => item["mccmnc"] === linkTextAddNumRouting,
  );
  const prefixesArray = objectArray?.map((obj) => obj["network_prefix"]);
  const uniquePrefixes = prefixesArray && [...new Set(prefixesArray)];

  const [provider, setProvider] = useState("");
  const [prefixes, setPrefixes] = useState("");
  const [extraPrefix, setExtraPrefix] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const selectedPrefix = prefixes.trim() ? prefixes : "";
  const mobile = selectedPrefix + extraPrefix;

  const queryClient = useQueryClient();
  const { data: countriesData } = useRoutingCountries();
  const { data: activePData } = useRoutingActiveProviders();
  const { mutate, statusCode } = usePostNumberRouting(
    queryClient,
    qKey,
    setFetchTrigger,
    handleClose,
    setPrefixes,
    setProvider,
    setShowStatus,
    setShowProgress,
  );

  const provBankRDataSet = genDotDataSet(activePData, "provider");
  const prefixesDataSet = genDataSet(uniquePrefixes);

  const defaultCtryMaxLength = countriesData?.find(
    (ctry) => ctry.code === objectType?.country,
  )?.phonelen;

  const ctryMaxLength =
    defaultCtryMaxLength && defaultCtryMaxLength !== 0
      ? defaultCtryMaxLength
      : 13;
  const maxLength = ctryMaxLength - (selectedPrefix?.length ?? 0);

  const handleSubmit = () => {
    setShowProgress(true);
    const postItem = {
      number: mobile,
      provider: provider,
      prefix: prefixes,
    };
    mutate(postItem);
  };

  return (
    <AddNumRFormJSX
      handleSubmit={handleSubmit}
      prefixes={prefixes}
      setPrefixes={setPrefixes}
      prefixesDataSet={prefixesDataSet}
      selectedPrefix={selectedPrefix}
      extraPrefix={extraPrefix}
      setExtraPrefix={setExtraPrefix}
      provBankRDataSet={provBankRDataSet}
      provider={provider}
      setProvider={setProvider}
      maxLength={maxLength}
      handleClose={handleClose}
      statusCode={statusCode}
      showStatus={showStatus}
      showProgress={showProgress}
    />
  );
};

export default AddNumRForm;
