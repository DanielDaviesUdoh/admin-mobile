import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import SectionsTestForm from "./SectionsTestForm";

export default function TestFormJSX(props) {
  const {
    handleSubmit,
    handleClose,
    country,
    network,
    mccmnc,
    prefix,
    initProv,
    initReason,
    provDataSet,
    providerChange,
    setProviderChange,
    reasonDataSet,
    reason,
    setReason,
    statusCode,
    showStatus,
    showProgress,
    changeProvidersIsLoading,
    changeReasonsIsLoading,
  } = props;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ paddingBottom: 24 }}
      keyboardShouldPersistTaps="handled"
      bottomOffset={20}
    >
      <SectionsTestForm
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        country={country}
        network={network}
        mccmnc={mccmnc}
        prefix={prefix}
        initProv={initProv}
        initReason={initReason}
        provDataSet={provDataSet}
        providerChange={providerChange}
        setProviderChange={setProviderChange}
        reasonDataSet={reasonDataSet}
        reason={reason}
        setReason={setReason}
        statusCode={statusCode}
        showStatus={showStatus}
        showProgress={showProgress}
        changeProvidersIsLoading={changeProvidersIsLoading}
        changeReasonsIsLoading={changeReasonsIsLoading}
      />
    </KeyboardAwareScrollView>
  );
}
