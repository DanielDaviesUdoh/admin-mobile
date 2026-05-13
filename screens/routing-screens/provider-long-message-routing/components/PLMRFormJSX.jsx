import React from "react";
import { FlatList } from "react-native";
import usePLMRFormSections from "./plmrFormSections";

export default function SIDRFormJSX(props) {
  const data = usePLMRFormSections(props);

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 12 }}
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => item.element}
      keyboardShouldPersistTaps="handled"
    />
  );
}
