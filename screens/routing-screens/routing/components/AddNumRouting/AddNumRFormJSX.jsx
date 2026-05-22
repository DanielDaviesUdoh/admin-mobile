import React from "react";
import { FlatList } from "react-native";
import useAddNumRFormSections from "./addNumRFormSections";

export default function AddNumRFormJSX(props) {
  const {
    handleSubmit,
    initProv,
    prefixes,
    setPrefixes,
    prefixesDataSet,
    selectedPrefix,
    extraPrefix,
    setExtraPrefix,
    provBankRDataSet,
    provider,
    setProvider,
    maxLength,
    handleClose,
    statusCode,
    showStatus,
    showProgress,
    activePIsLoading,
  } = props;

  const data = useAddNumRFormSections({
    handleSubmit,
    initProv,
    prefixes,
    setPrefixes,
    prefixesDataSet,
    selectedPrefix,
    extraPrefix,
    setExtraPrefix,
    provBankRDataSet,
    provider,
    setProvider,
    maxLength,
    handleClose,
    statusCode,
    showStatus,
    showProgress,
    activePIsLoading,
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
