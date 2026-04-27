import React from "react";
import { FlatList } from "react-native";
import useOTPDeleteFormSections from "./otpDeleteFormSections";

export default function OTPDeleteFormJSX(props) {
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

  const data = useOTPDeleteFormSections({
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
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => item.element}
      keyboardShouldPersistTaps="handled"
    />
  );
}
