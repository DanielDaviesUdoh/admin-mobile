import React from "react";
import { FlatList } from "react-native";
import useCNPFormSections from "./cnpFormSections";

export default function CNPFormJSX(props) {
  const {
    handleSubmit,
    handleClose,
    prefix,
    setPrefix,
    enableButton,
    statusCode,
    showStatus,
    showProgress,
    networkLabel,
    linkTextCtryNetworkPrefix,
    ctryCode,
    maxLength,
  } = props;

  const data = useCNPFormSections({
    handleSubmit,
    handleClose,
    prefix,
    setPrefix,
    enableButton,
    statusCode,
    showStatus,
    showProgress,
    networkLabel,
    linkTextCtryNetworkPrefix,
    ctryCode,
    maxLength,
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
