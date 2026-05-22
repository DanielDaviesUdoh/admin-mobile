import React from "react";
import { FlatList } from "react-native";
import useOTPChangeFormSections from "./otpChangeFormSections";

export default function OtpChangeFormJSX(props) {
  const {
    handleSubmit,
    handleClose,
    country,
    network,
    mccmnc,
    prefix,
    initProv,
    otpProvDataSet,
    providerChange,
    setProviderChange,
    statusCode,
    showStatus,
    showProgress,
    activeProvidersIsLoading,
  } = props;

  const data = useOTPChangeFormSections({
    handleSubmit,
    handleClose,
    country,
    network,
    mccmnc,
    prefix,
    initProv,
    otpProvDataSet,
    providerChange,
    setProviderChange,
    statusCode,
    showStatus,
    showProgress,
    activeProvidersIsLoading,
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
