import React from "react";
import { FlatList } from "react-native";
import useCNFormSections from "./cnFormSections";

export default function CNFormJSX(props) {
  const {
    handleSubmit,
    handleClose,
    countryName,
    mcc,
    networkName,
    nCode,
    setNCode,
    nName,
    setNName,
    enableButton,
    statusCode,
    showStatus,
    showProgress,
  } = props;

  const data = useCNFormSections({
    handleSubmit,
    handleClose,
    countryName,
    mcc,
    networkName,
    nCode,
    setNCode,
    nName,
    setNName,
    enableButton,
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
