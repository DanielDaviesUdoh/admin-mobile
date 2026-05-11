import { useFormStyles } from "@/styles/formStyles";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import AutocompleteFieldTwo from "@/components/auto-complete-fieldtwo";
import Feedback from "@/components/feedback";
import InputFieldOne from "@/components/input-field-one";

export default function useSIDRFormSections(props) {
  const styles = useFormStyles();

  const {
    handleSubmit,
    initVal,
    clientIdsDataSet,
    senderIdsDataSet,
    providersDataSet,
    networksDataSet,
    senderId,
    network,
    clientId,
    setClientId,
    setSenderId,
    provider,
    setProvider,
    setNetwork,
    toSender,
    setToSender,
    handleCloseEdit,
    isEdit,
    postStatusCode,
    putStatusCode,
    showStatus,
    showProgress,
    isDisabled,
    sidrCIdsIsLoading,
    sidrProvsIsLoading,
    sidrSIdsIsLoading,
    sidrNetIsLoading,
  } = props;

  const Header = (
    <View style={styles.formHeader}>
      <Text style={styles.title}>Add/Edit Sender ID Replace</Text>

      <Pressable onPress={handleCloseEdit} hitSlop={10}>
        <Text style={styles.closeBtn}>×</Text>
      </Pressable>
    </View>
  );

  const Body = (
    <View style={styles.formBody}>
      {/* Client ID */}
      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}>Client ID:</Text>

        <View style={styles.textfield}>
          <AutocompleteFieldTwo
            dataSet={clientIdsDataSet}
            value={clientId}
            onChange={(v) => setClientId(v)}
            isLoading={sidrCIdsIsLoading}
            disabled={isEdit}
          />
        </View>
      </View>

      {/* Sender ID */}
      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}>Sender ID:</Text>

        <View style={styles.textfield}>
          <AutocompleteFieldTwo
            dataSet={senderIdsDataSet}
            value={senderId}
            onChange={(v) => setSenderId(v)}
            isLoading={sidrSIdsIsLoading}
            disabled={clientId === initVal || isEdit}
          />
        </View>
      </View>

      {/* Provider */}
      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}>Provider:</Text>

        <View style={styles.textfield}>
          <AutocompleteFieldTwo
            dataSet={providersDataSet}
            value={provider}
            onChange={(v) => setProvider(v)}
            isLoading={sidrProvsIsLoading}
            disabled={isEdit}
          />
        </View>
      </View>

      {/* Network */}
      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}>Network:</Text>

        <View style={styles.textfield}>
          <AutocompleteFieldTwo
            dataSet={networksDataSet}
            value={network}
            onChange={(v) => setNetwork(v)}
            isLoading={sidrNetIsLoading}
            disabled={provider === initVal || isEdit}
          />
        </View>
      </View>

      {/* To Sender */}
      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}>To Sender ID:</Text>

        <View style={styles.textfield}>
          <InputFieldOne
            value={toSender}
            onChangeText={setToSender}
            maxLength={11}
          />
        </View>
      </View>

      {/* Feedback */}
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
