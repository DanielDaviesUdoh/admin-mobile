import AutocompleteFieldTwo from "@/components/auto-complete-fieldtwo";
import { useFormOneStyles } from "@/styles/formOneStyles";

import React from "react";
import { Pressable, Text, View } from "react-native";

export default function ProviderNetworkForm(props) {
  const {
    provDataSet,
    value,
    setValue,
    activePIsLoading,
    filteredData,
    handleFilter,
  } = props;
  const styles = useFormOneStyles();

  return (
    <View style={styles.formCont}>
      <View style={styles.formGroup}>
        <View style={styles.textfield}>
          <AutocompleteFieldTwo
            dataSet={provDataSet}
            value={value}
            onChange={(v) => setValue(v)}
            isLoading={activePIsLoading}
          />
        </View>
      </View>
      <View style={[styles.formGroup, styles.formGroupColGap]}>
        <Pressable
          style={[styles.buttonCont, { opacity: !filteredData ? 0.75 : 1 }]}
          disabled={!filteredData}
          onPress={handleFilter}
        >
          <Text style={styles.buttonText}>Filter</Text>
        </Pressable>
      </View>
    </View>
  );
}
