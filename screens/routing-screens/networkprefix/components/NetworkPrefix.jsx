import FeedbackTwo from "@/components/feedback-two";
import Loading from "@/components/loading";
import { getHrefModal } from "@/constants/hrefModal";
import { genCtryDataSet } from "@/constants/menuItems";
import {
  useNetworkPrefixAll,
  useRoutingCountries,
} from "@/hooks/useRoutingShared";
import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { COLUMNS_NETWORKPREFIX } from "../constants/netPrefixTHead";
import NetworkPrefixForm from "./NetworkPrefixForm";
import NPDSAddPrefix from "./NPDSAddPrefix";
import NPrefixFilteredTable from "./NPrefixFilteredTable";

const initVal = {
  name: "All countries",
  code: "Select country code",
  phonelen: "",
};

export default function NetworkPrefixScreen() {
  const styles = useSubScreenStyles();
  const [value, setValue] = useState(initVal.name);
  const [filter, setFilter] = useState(initVal.name);
  const [modalState, setModalState] = useState({
    addPrefix: { open: false, linkText: "" },
  });

  const { data: countryCode, isLoading: countryCodeIsLoading } =
    useRoutingCountries();
  const {
    isLoading: rPALoading,
    data: routingPrefixAll,
    isError: rPAIsError,
    statusCode: rPAStatusCode,
  } = useNetworkPrefixAll();

  const filteredData = useMemo(() => {
    return filter === initVal.name
      ? routingPrefixAll
      : routingPrefixAll?.filter((item) => item["country_name"] === filter);
  }, [filter, routingPrefixAll]);

  const handleFilter = () => {
    setFilter(value);
  };

  const ctryDataSet =
    countryCode?.length > 0
      ? genCtryDataSet([initVal, ...countryCode], "name")
      : genCtryDataSet([initVal], "name");

  const { handleHref, closeModal } = useMemo(
    () => getHrefModal(setModalState),
    [setModalState],
  );

  return (
    <View style={styles.cont}>
      <NetworkPrefixForm
        ctryDataSet={ctryDataSet}
        value={value}
        setValue={setValue}
        countryCodeIsLoading={countryCodeIsLoading}
        filteredData={filteredData}
        handleFilter={handleFilter}
        filter={filter}
      />
      {rPALoading && <Loading text="Networks Loading..." />}

      {rPAIsError && <FeedbackTwo statusCode={rPAStatusCode} />}

      {!rPAIsError && (
        <View style={styles.tableCont}>
          <NPrefixFilteredTable
            initVal={initVal}
            filter={filter}
            filteredData={filteredData}
            columns={COLUMNS_NETWORKPREFIX}
            handleHrefAddPrefix={handleHref("addPrefix")}
          />
        </View>
      )}

      {modalState.addPrefix.open && (
        <NPDSAddPrefix
          openAddPrefix={modalState.addPrefix.open}
          closeModalAddPrefix={closeModal("addPrefix")}
          linkTextAddPrefix={modalState.addPrefix.linkText}
          filteredData={filteredData}
        />
      )}
    </View>
  );
}
