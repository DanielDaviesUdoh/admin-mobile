import FeedbackTwo from "@/components/feedback-two";
import Loading from "@/components/loading";
import { genCtryDataSet } from "@/constants/menuItems";
import {
  useNetworkListAll,
  useRoutingCountries,
} from "@/hooks/useRoutingShared";
import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { COLUMNS_NETWORKLIST } from "../utils/NetworkLTHead";
import NetworkListForm from "./NetworkListForm";
import NLFilteredTables from "./NLFilteredTables";

export default function NetworkListScreen() {
  const initVal = {
    name: "All countries",
    code: "Select country code",
    phonelen: "",
  };
  const [value, setValue] = useState(initVal.name);
  const [filter, setFilter] = useState(initVal.name);
  const { data: countryCode, isLoading: countryCodeIsLoading } =
    useRoutingCountries();
  const {
    isLoading: rLALoading,
    data: routingListingAll,
    isError: rLAIsError,
    statusCode: rLAstatusCode,
  } = useNetworkListAll();

  const styles = useSubScreenStyles();

  // Filter data based on the selected filter
  const filteredData = useMemo(() => {
    return filter === "All countries"
      ? routingListingAll
      : routingListingAll?.filter((item) => item["country_name"] === filter);
  }, [filter, routingListingAll]);

  const handleFilter = () => {
    setFilter(value);
  };

  const ctryDataSet =
    countryCode?.length > 0
      ? genCtryDataSet([initVal, ...countryCode], "name")
      : genCtryDataSet([initVal], "name");

  return (
    <View style={styles.cont}>
      <NetworkListForm
        ctryDataSet={ctryDataSet}
        value={value}
        setValue={setValue}
        countryCodeIsLoading={countryCodeIsLoading}
        filteredData={filteredData}
        handleFilter={handleFilter}
        filter={filter}
      />
      {rLALoading && <Loading text="Networks Loading..." />}
      {rLAIsError && <FeedbackTwo statusCode={rLAstatusCode} />}
      {!rLAIsError && (
        <View style={styles.tableCont}>
          <NLFilteredTables
            filter={filter}
            filteredData={filteredData}
            columns={COLUMNS_NETWORKLIST}
          />
        </View>
      )}
    </View>
  );
}
