import React from "react";
import { FlatList } from "react-native";
import useProvDeleteFormSections from "./provDeleteFormSections";

export default function ProvDeleteFormJSX(props) {
  const {
    handleSubmit,
    handleClose,
    fieldVal,
    country,
    network,
    mccmnc,
    prefix,
    statusCode,
    showStatus,
    showProgress,
  } = props;

  const data = useProvDeleteFormSections({
    handleSubmit,
    handleClose,
    fieldVal,
    country,
    network,
    mccmnc,
    prefix,
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
