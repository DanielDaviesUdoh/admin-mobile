import AutocompleteFieldTwo from "@/components/auto-complete-fieldtwo";
import { useFormOneStyles } from "@/styles/formOneStyles";

import React from "react";
import { Pressable, Text, View } from "react-native";

export default function NetworkPrefixForm(props) {
  const {
    ctryDataSet,
    value,
    setValue,
    countryCodeIsLoading,
    filteredData,
    handleFilter,
  } = props;
  const styles = useFormOneStyles();

  return (
    <View style={styles.formCont}>
      <View style={styles.formGroup}>
        <View style={styles.textfield}>
          <AutocompleteFieldTwo
            dataSet={ctryDataSet}
            value={value}
            onChange={(v) => setValue(v)}
            isLoading={countryCodeIsLoading}
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
