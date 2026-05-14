import FeedbackTwo from "@/components/feedback-two";
import Loading from "@/components/loading";
import { genDotDataSet } from "@/constants/menuItems";
import { useRoutingActiveProviders } from "@/hooks/useRoutingShared";
import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { COLUMNS_PROVNET } from "../constants/provNetTHead";
import { useProviderNetwork } from "../hooks/useProvNetwork";
import PNFilteredTable from "./PNFilteredTable";
import ProviderNetworkForm from "./ProviderNetworkForm";

export default function ProviderNetworkScreen() {
  const styles = useSubScreenStyles();
  const initVal = { provider: "All providers" };
  const [value, setValue] = useState(initVal.provider);
  const [filter, setFilter] = useState(initVal.provider);

  const { data: activePData, isLoading: activePIsLoading } =
    useRoutingActiveProviders();

  const {
    isLoading: pNLoading,
    data: pNetworkData,
    isError: pNIsError,
    statusCode: pNStatusCode,
  } = useProviderNetwork();

  const filteredData = useMemo(() => {
    return filter === "All providers"
      ? pNetworkData
      : pNetworkData?.filter((item) => item["provider"] === filter);
  }, [filter, pNetworkData]);

  const handleFilter = () => {
    setFilter(value);
  };

  const provDataSet =
    activePData?.length > 0
      ? genDotDataSet([initVal, ...activePData], "provider")
      : genDotDataSet([initVal], "provider");

  return (
    <View style={styles.cont}>
      <ProviderNetworkForm
        provDataSet={provDataSet}
        value={value}
        setValue={setValue}
        activePIsLoading={activePIsLoading}
        filteredData={filteredData}
        handleFilter={handleFilter}
      />
      {pNLoading && <Loading text="Networks Loading..." />}
      {pNIsError && <FeedbackTwo statusCode={pNStatusCode} />}
      {!pNIsError && (
        <View style={styles.tableCont}>
          <PNFilteredTable
            initVal={initVal}
            filter={filter}
            filteredData={filteredData}
            columns={COLUMNS_PROVNET}
          />
        </View>
      )}
    </View>
  );
}
