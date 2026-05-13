import { useFormStyles } from "@/styles/formStyles";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import AutocompleteFieldTwo from "@/components/auto-complete-fieldtwo";
import Feedback from "@/components/feedback";
import InputFieldOne from "@/components/input-field-one";

export default function usePLMRFormSections(props) {
  const styles = useFormStyles();

  const {
    handleSubmit,
    handleCloseEdit,
    curProviderDataSet,
    curNetworkDataSet,
    longMsgProviderDataSet,
    activeProvIsLoading,
    networkLAllIsLoading,
    curProvider,
    setCurProvider,
    isEdit,
    curNetwork,
    setCurNetwork,
    sendLongMsg,
    setSendLongMsg,
    longMsgProvider,
    setLongMsgProvider,
    postStatusCode,
    putStatusCode,
    showStatus,
    showProgress,
    isDisabled,
  } = props;

  const Header = (
    <View style={styles.formHeader}>
      <Text style={styles.title}>Add/Edit Long Provider</Text>

      <Pressable onPress={handleCloseEdit} hitSlop={10}>
        <Text style={styles.closeBtn}>×</Text>
      </Pressable>
    </View>
  );

  const Body = (
    <View style={styles.formBody}>
      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}>Current Provider:</Text>

        <View style={styles.textfield}>
          <AutocompleteFieldTwo
            dataSet={curProviderDataSet}
            value={curProvider}
            onChange={(v) => setCurProvider(v)}
            isLoading={activeProvIsLoading}
            disabled={isEdit}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}>Current Network:</Text>

        <View style={styles.textfield}>
          <AutocompleteFieldTwo
            dataSet={curNetworkDataSet}
            value={curNetwork}
            onChange={(v) => setCurNetwork(v)}
            isLoading={networkLAllIsLoading}
            disabled={isEdit}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}>Send long Msg greater than to:</Text>

        <View style={styles.textfield}>
          <InputFieldOne
            value={sendLongMsg?.trim()}
            onChangeText={setSendLongMsg}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}> LongMsg Provider:</Text>

        <View style={styles.textfield}>
          <AutocompleteFieldTwo
            dataSet={longMsgProviderDataSet}
            value={longMsgProvider}
            onChange={(v) => setLongMsgProvider(v)}
            isLoading={activeProvIsLoading}
          />
        </View>
      </View>

      {showStatus && postStatusCode && <Feedback statusCode={postStatusCode} />}
      {showStatus && putStatusCode && <Feedback statusCode={putStatusCode} />}
    </View>
  );

  const Footer = (
    <View style={styles.formFooter}>
      <Pressable
        onPress={handleSubmit}
        disabled={isDisabled}
        style={[styles.submit, styles.postOne, isDisabled && styles.disabled]}
      >
        {showProgress ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>{isEdit ? "Update" : "Add"}</Text>
        )}
      </Pressable>
    </View>
  );

  return [
    { key: "header", element: Header },
    { key: "body", element: Body },
    { key: "footer", element: Footer },
  ];
}
