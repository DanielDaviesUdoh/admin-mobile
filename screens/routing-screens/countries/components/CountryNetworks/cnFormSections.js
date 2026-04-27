import { useFormStyles } from "@/styles/formStyles";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import Feedback from "@/components/feedback";
import InputFieldOne from "@/components/input-field-one";
import InputSFieldOne from "@/components/input-sfield-one";

export default function useCNFormSections(props) {
  const styles = useFormStyles();

  const {
    handleSubmit,
    handleClose,
    countryName,
    mcc,
    networkName,
    nCode,
    setNCode,
    nName,
    setNName,
    enableButton,
    statusCode,
    showStatus,
    showProgress,
  } = props;

  const Header = (
    <View style={styles.formHeader}>
      <Text style={styles.title}>Add Country Network</Text>

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
        <Text style={styles.controlLabel}>Country:</Text>

        <View style={styles.textfield}>
          <InputSFieldOne value={countryName?.trim() ?? ""} />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}>Network Code:</Text>

        <View style={[styles.textfield, styles.addNumRouting]}>
          <View style={{ width: 80 }}>
            <InputSFieldOne
              value={mcc ?? ""}
              outlineStyle={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRightWidth: 0,
              }}
            />
          </View>

          <View
            style={{
              minWidth: 60,
              maxWidth: 90,
              width: "100%",
            }}
          >
            <InputFieldOne
              value={nCode?.trim()}
              onChangeText={setNCode}
              maxLength={3}
              outlineStyle={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                marginLeft: -6,
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}>Network Name:</Text>

        <View style={styles.textfield}>
          <InputFieldOne
            placeholder={`e.g. ${networkName}`}
            value={nName}
            setValue={setNName}
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
        disabled={!enableButton}
        style={[styles.submit, styles.post, !enableButton && styles.disabled]}
      >
        {showProgress ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Add New Network</Text>
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
