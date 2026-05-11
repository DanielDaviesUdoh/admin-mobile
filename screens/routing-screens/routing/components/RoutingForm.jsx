import {
  getHandleSelectFocus,
  getHandleTextFocus,
} from "@/constants/fieldFocusFunc";
import { genCtryDataSet, genDotDataSet } from "@/constants/menuItems";
import {
  useRoutingActiveProviders,
  useRoutingCountries,
} from "@/hooks/useRoutingShared";
import {
  ROUTING_BY_COUNTRY,
  ROUTING_BY_PREFIX,
  ROUTING_BY_PROVIDER,
} from "@/services/routingEndpoints";
import { getDisableFetchBtn, getHandleSubmit } from "../constants/rFormFunc";
import RoutingFormJXS from "./RoutingFormJXS";

export default function RoutingForm(props) {
  const {
    selectedRadioBtn,
    setSelectedRadioBtn,
    setPanelHeading,
    initFieldCtryC,
    initFieldProv,
    setSelectedFCtryCode,
    fieldCountryCode,
    setFieldCountryCode,
    fieldPhoneOrPrefix,
    setFieldPhoneOrPrefix,
    fieldProvider,
    setFieldProvider,
    setEndpoint,
    setQKey,
    setFetchTrigger,
    showProgData,
    showProgDataDesgPLongM,
  } = props;

  const { data: countryCode } = useRoutingCountries();
  const { data: provider } = useRoutingActiveProviders();

  // console.log({ countryCode });

  const ctryDataSet =
    countryCode && countryCode?.length > 0
      ? genCtryDataSet([initFieldCtryC, ...countryCode])
      : genCtryDataSet([initFieldCtryC]);
  const provDataSet =
    provider && provider?.length > 0
      ? genDotDataSet([initFieldProv, ...provider], "provider")
      : genDotDataSet([initFieldProv], "provider");

  const disableFetchBtn = getDisableFetchBtn(
    selectedRadioBtn,
    fieldCountryCode,
    initFieldCtryC,
    fieldPhoneOrPrefix,
    fieldProvider,
    initFieldProv,
  );
  const handleSelectFocus = getHandleSelectFocus(setSelectedRadioBtn);
  const handleTextFocus = getHandleTextFocus(setSelectedRadioBtn);
  const handleSubmit = getHandleSubmit(
    setEndpoint,
    setPanelHeading,
    setSelectedFCtryCode,
    setQKey,
    selectedRadioBtn,
    fieldCountryCode,
    fieldPhoneOrPrefix,
    fieldProvider,
    setFetchTrigger,
    ROUTING_BY_COUNTRY,
    ROUTING_BY_PREFIX,
    ROUTING_BY_PROVIDER,
  );

  return (
    <RoutingFormJXS
      handleSubmit={handleSubmit}
      selectedRadioBtn={selectedRadioBtn}
      setSelectedRadioBtn={setSelectedRadioBtn}
      countryCode={countryCode}
      ctryDataSet={ctryDataSet}
      fieldCountryCode={fieldCountryCode}
      setFieldCountryCode={setFieldCountryCode}
      handleSelectFocus={handleSelectFocus}
      fieldPhoneOrPrefix={fieldPhoneOrPrefix}
      setFieldPhoneOrPrefix={setFieldPhoneOrPrefix}
      handleTextFocus={handleTextFocus}
      provDataSet={provDataSet}
      fieldProvider={fieldProvider}
      setFieldProvider={setFieldProvider}
      disableFetchBtn={disableFetchBtn}
      showProgData={showProgData}
      showProgDataDesgPLongM={showProgDataDesgPLongM}
    />
  );
}
