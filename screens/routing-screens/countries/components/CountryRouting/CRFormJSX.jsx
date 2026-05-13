import React from "react";
import { FlatList } from "react-native";
import useCRFormSections from "./crFormSections ";

export default function CRFormJSX(props) {
  const {
    handleSubmit,
    handleClose,
    initNetPrefix,
    initProv,
    networkPrefix,
    provider,
    netPrefixDataSet,
    provDataSet,
    setNetworkPrefix,
    selectedPrefix,
    extraPrefix,
    setExtraPrefix,
    setProvider,
    enableButton,
    statusCode,
    showStatus,
    showProgress,
    maxLength,
  } = props;

  const data = useCRFormSections({
    handleSubmit,
    handleClose,
    networkPrefix,
    provider,
    netPrefixDataSet,
    provDataSet,
    setNetworkPrefix,
    selectedPrefix,
    extraPrefix,
    setExtraPrefix,
    setProvider,
    enableButton,
    statusCode,
    showStatus,
    showProgress,
    maxLength,
  });

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
