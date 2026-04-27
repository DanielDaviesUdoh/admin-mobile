import { useFormStyles } from "@/styles/formStyles";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import AutocompleteField from "@/components/auto-complete-field";
import Feedback from "@/components/feedback";
import InputSFieldOne from "@/components/input-sfield-one";

export default function useProvChangeFormSections(props) {
  const styles = useFormStyles();

  const {
    handleSubmit,
    handleClose,
    country,
    network,
    mccmnc,
    prefix,
    provDataSet,
    providerChange,
    setProviderChange,
    reasonDataSet,
    reason,
    setReason,
    statusCode,
    showStatus,
    showProgress,
  } = props;

  const isDisabled =
    !providerChange?.trim() || reason === "Please Select" || showProgress;

  const Header = (
    <View style={styles.formHeader}>
      <Text style={styles.title}>Routing :: Change Provider</Text>

      <Pressable
        accessibilityLabel="Close Form"
        onPress={handleClose}
        hitSlop={10}
      >
        <Text style={styles.closeBtn}>×</Text>
      </Pressable>
    </View>
  );

  const Body = (
    <View style={styles.formBody}>
      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjustOne]}>
          Country:
        </Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={country ?? ""} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjustOne]}>
          Network:
        </Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={network ?? ""} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjustOne]}>
          MccMnc:
        </Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={mccmnc ?? ""} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjustOne]}>
          Prefix:
        </Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={prefix ?? ""} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjustOne]}>
          Provider:
        </Text>

        <View style={styles.textfield}>
          <AutocompleteField
            dataSet={provDataSet}
            value={providerChange}
            onChange={(v) => setProviderChange(v)}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjustOne]}>
          Reason:
        </Text>

        <View style={styles.textfield}>
          <AutocompleteField
            dataSet={reasonDataSet}
            value={reason}
            onChange={(v) => setReason(v)}
          />
        </View>
      </View>

      {showStatus && <Feedback statusCode={statusCode} />}
    </View>
  );

  const Footer = (
    <View style={styles.formFooter}>
      <Pressable
        onPress={handleSubmit}
        disabled={isDisabled}
        style={[styles.submit, styles.post, isDisabled && styles.disabled]}
      >
        {showProgress ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Change</Text>
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
