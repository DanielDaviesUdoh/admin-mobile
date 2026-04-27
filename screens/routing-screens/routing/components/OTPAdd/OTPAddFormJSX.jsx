import React from "react";
import { FlatList } from "react-native";
import useOTPAddFormSections from "./otpAddFormSections";

export default function OTPAddFormJSX(props) {
  const {
    handleSubmit,
    handleClose,
    country,
    network,
    mccmnc,
    prefix,
    otpProvDataSet,
    providerChange,
    setProviderChange,
    statusCode,
    showStatus,
    showProgress,
  } = props;

  const data = useOTPAddFormSections({
    handleSubmit,
    handleClose,
    country,
    network,
    mccmnc,
    prefix,
    otpProvDataSet,
    providerChange,
    setProviderChange,
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
