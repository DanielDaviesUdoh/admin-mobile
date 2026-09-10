import { genDotDataSet, getDataSetForDropdown } from "@/constants/menuItems";
import { useMemo, useState } from "react";
import TestFormJSX from "./TestFormJSX";

const dataTest = [
  {
    country_name: "one",
    network: "one",
    mccmnc: "one",
    network_prefix: "one",
    phone_prefix: "one",
  },
  {
    country_name: "two",
    network: "two",
    mccmnc: "two",
    network_prefix: "two",
    phone_prefix: "two",
  },
  {
    country_name: "three",
    network: "three",
    mccmnc: "three",
    network_prefix: "three",
    phone_prefix: "three",
  },
];

const TestForm = ({
  data = dataTest,
  linkTextProvChange = "two",
  handleClose,
}) => {
  const fieldsObjects = data?.find(
    (item) => item["phone_prefix"] === linkTextProvChange,
  );
  const {
    country_name: country,
    network,
    mccmnc,
    network_prefix: prefix,
  } = fieldsObjects ?? {};

  const initProv = useMemo(
    () => ({ provider: "SENTINEL", isDefault: true, sentinel: "select" }),
    [],
  );
  const initReason = useMemo(
    () => ({ code: "SENTINEL", isDefault: true, sentinel: "select" }),
    [],
  );

  const [providerChange, setProviderChange] = useState(initProv.provider);
  const [reason, setReason] = useState(initReason.code);

  const changeProviders = [
    { provider: "oneoenkajhdteggaoopett jjk gshh ttyy" },
    { provider: "two" },
    { provider: "three" },
  ];
  const changeReasons = [{ code: "one" }, { code: "two" }, { code: "three" }];

  const provDataSet = getDataSetForDropdown({
    isLoading: false,
    genType: "genDotDataSet",
    genFunc: genDotDataSet,
    data: changeProviders,
    dot: "provider",
    initVal: initProv,
  });

  const reasonDataSet = getDataSetForDropdown({
    isLoading: false,
    genType: "genDotDataSet",
    genFunc: genDotDataSet,
    data: changeReasons,
    dot: "code",
    initVal: initReason,
  });

  const handleSubmit = async () => {};

  return (
    <TestFormJSX
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      country={country}
      network={network}
      mccmnc={mccmnc}
      prefix={prefix}
      initProv={initProv}
      initReason={initReason}
      provDataSet={provDataSet}
      providerChange={providerChange}
      setProviderChange={setProviderChange}
      reasonDataSet={reasonDataSet}
      reason={reason}
      setReason={setReason}
      statusCode={"statusCodeTest"}
      showStatus={false}
      showProgress={false}
      changeProvidersIsLoading={false}
      changeReasonsIsLoading={false}
    />
  );
};

export default TestForm;
