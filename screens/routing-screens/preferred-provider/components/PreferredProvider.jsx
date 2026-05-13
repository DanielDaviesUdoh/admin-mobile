import FeedbackTwo from "@/components/feedback-two";
import Loading from "@/components/loading";
import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { useState } from "react";
import { View } from "react-native";
import { COLUMNS_PPROV } from "../constants/prefProvTHead";
import {
  useRoutingPreferredProvAll,
  useRoutingPreferredProvUnmatched,
} from "../hooks/usePreferredP";
import PPRadioButtons from "./PPRadioButtons";
import PPTable from "./PPTable";

const PreferredProviderScreen = () => {
  const styles = useSubScreenStyles();
  const [radioValue, setRadioValue] = useState("");
  const {
    data: allData,
    isLoading: allIsLoading,
    isError: allIsError,
    statusCode: allStatusCode,
  } = useRoutingPreferredProvAll(radioValue);
  const {
    data: unmatchedData,
    isLoading: unMatchedIsLoading,
    isError: unMatchedIsError,
    statusCode: unMatchedStatusCode,
  } = useRoutingPreferredProvUnmatched(radioValue);

  return (
    <View style={styles.cont}>
      <PPRadioButtons radioValue={radioValue} setRadioValue={setRadioValue} />

      {radioValue === "unmatched" && unMatchedIsLoading && <Loading />}
      {radioValue === "all" && allIsLoading && <Loading />}

      {radioValue === "all" && allIsError && (
        <FeedbackTwo
          errorLocation={"all preferred provider"}
          statusCode={allStatusCode}
        />
      )}
      {radioValue === "unmatched" && unMatchedIsError && (
        <FeedbackTwo
          errorLocation={"unmatched preferred provider"}
          statusCode={unMatchedStatusCode}
        />
      )}

      {!allIsError && !unMatchedIsError && (
        <View style={styles.tableCont}>
          <PPTable
            panelHeading={"Preferred Networks"}
            data={radioValue === "unmatched" ? unmatchedData : allData}
            columns={COLUMNS_PPROV}
          />
        </View>
      )}
    </View>
  );
};

export default PreferredProviderScreen;
