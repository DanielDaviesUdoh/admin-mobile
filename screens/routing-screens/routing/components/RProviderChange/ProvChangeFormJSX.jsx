import React from "react";
import { FlatList } from "react-native";
import useProvChangeFormSections from "./provChangeFormSections";

export default function ProvChangeFormJSX(props) {
  const {
    handleSubmit,
    handleClose,
    country,
    network,
    mccmnc,
    prefix,
    provDataSet,
    providerChange,
    setProviderChange,
    reasonDataSet,
    reason,
    setReason,
    statusCode,
    showStatus,
    showProgress,
  } = props;

  const data = useProvChangeFormSections({
    handleSubmit,
    handleClose,
    country,
    network,
    mccmnc,
    prefix,
    provDataSet,
    providerChange,
    setProviderChange,
    reasonDataSet,
    reason,
    setReason,
    statusCode,
    showStatus,
    showProgress,
  });

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
