import React from "react";
import { FlatList } from "react-native";
import useSIDRFormSections from "./sidrFormSections";

export default function SIDRFormJSX(props) {
  const data = useSIDRFormSections(props);

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 24 }}
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => item.element}
      keyboardShouldPersistTaps="handled"
    />
  );
}
