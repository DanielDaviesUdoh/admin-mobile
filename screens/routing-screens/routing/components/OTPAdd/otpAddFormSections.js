import { useFormStyles } from "@/styles/formStyles";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import AutocompleteFieldTwo from "@/components/auto-complete-fieldtwo";
import Feedback from "@/components/feedback";
import InputSFieldOne from "@/components/input-sfield-one";

export default function useOTPAddFormSections(props) {
  const styles = useFormStyles();

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
  } = props;

  const isDisabled = providerChange === initProv.provider || showProgress;

  const Header = (
    <View style={styles.formHeader}>
      <Text style={styles.title}>Routing :: Add OTP Provider</Text>

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
          <InputSFieldOne value={country} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjust]}>Network:</Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={network} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjust]}>MccMnc:</Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={mccmnc} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel, styles.widthAdjust]}>Prefix:</Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={prefix} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.controlLabel]}>OTP Provider:</Text>

        <View style={styles.textfield}>
          <AutocompleteFieldTwo
            dataSet={otpProvDataSet}
            value={providerChange}
            onChange={(v) => setProviderChange(v)}
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
          <Text style={styles.submitText}>Add</Text>
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
