import { useFormStyles } from "@/styles/formStyles";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import Feedback from "@/components/feedback";
import InputFieldOne from "@/components/input-field-one";
import InputSFieldOne from "@/components/input-sfield-one";

export default function useNetworkPFormSections(props) {
  const styles = useFormStyles();

  const {
    handleSubmit,
    handleClose,
    prefix,
    setPrefix,
    enableButton,
    statusCode,
    showStatus,
    showProgress,
    networkLabel,
    linkTextAddPrefix,
    ctryCode,
    maxLength,
  } = props;

  const Header = (
    <View style={styles.formHeader}>
      <Text style={styles.title}>Add Network Prefix</Text>

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
        <Text style={styles.controlLabel}>{networkLabel}:</Text>

        <View style={styles.textfield}>
          <View style={styles.cnpNetworkWidth}>
            <InputSFieldOne value={linkTextAddPrefix ?? ""} />
          </View>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.controlLabel}>Prefix:</Text>

        <View style={[styles.textfield, styles.addNumRouting]}>
          <View style={{ width: 80 }}>
            <InputSFieldOne
              value={ctryCode ?? ""}
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
              value={prefix?.trim()}
              onChangeText={setPrefix}
              maxLength={maxLength}
              outlineStyle={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                marginLeft: -6,
              }}
            />
          </View>
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
          <Text style={styles.submitText}>Add New Prefix</Text>
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
