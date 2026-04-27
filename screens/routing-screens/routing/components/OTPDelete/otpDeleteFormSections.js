import { useFormStyles } from "@/styles/formStyles";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import Feedback from "@/components/feedback";
import InputSFieldOne from "@/components/input-sfield-one";

export default function useOTPDeleteFormSections(props) {
  const styles = useFormStyles();

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

  const Header = (
    <View style={styles.formHeader}>
      <Text style={styles.title}>Routing :: Delete OTP Provider</Text>

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
        <Text style={[styles.controlLabel, styles.widthAdjust]}>Country:</Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={country ?? fieldVal?.country} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjust]}>Network:</Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={network ?? fieldVal?.network} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjust]}>MccMnc:</Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={mccmnc ?? fieldVal?.mccmnc} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjust]}>Prefix:</Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={prefix ?? fieldVal?.prefix} />
        </View>
      </View>

      {showStatus && <Feedback statusCode={statusCode} />}
    </View>
  );

  const Footer = (
    <View style={styles.formFooter}>
      <Pressable
        onPress={handleSubmit}
        disabled={showProgress}
        style={[styles.submit, styles.delete, showProgress && styles.disabled]}
      >
        {showProgress ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Delete</Text>
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
