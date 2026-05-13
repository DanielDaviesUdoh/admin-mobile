import React from "react";
import { FlatList } from "react-native";
import useNetworkPFormSections from "./networkpFormSections";

export default function NPAddFormJSX(props) {
  const {
    handleSubmit,
    handleClose,
    linkTextAddPrefix,
    prefix,
    setPrefix,
    enableButton,
    statusCode,
    showStatus,
    showProgress,
    ctryCode,
    maxLength,
    networkLabel,
  } = props;

  const data = useNetworkPFormSections({
    handleSubmit,
    handleClose,
    prefix,
    setPrefix,
    enableButton,
    statusCode,
    showStatus,
    showProgress,
    networkLabel,
    linkTextAddPrefix,
    ctryCode,
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
