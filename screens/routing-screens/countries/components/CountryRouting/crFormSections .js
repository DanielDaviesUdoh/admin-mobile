import { useFormStyles } from "@/styles/formStyles";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import AutocompleteField from "@/components/auto-complete-field";
import Feedback from "@/components/feedback";
import InputFieldOne from "@/components/input-field-one";
import InputSFieldOne from "@/components/input-sfield-one";

export default function useCRFormSections(props) {
  const styles = useFormStyles();

  const {
    handleSubmit,
    handleClose,
    initNetPrefix,
    initProv,
    netPrefixDataSet,
    provDataSet,
    setNetworkPrefix,
    selectedPrefix,
    extraPrefix,
    setExtraPrefix,
    setProvider,
    enableButton,
    statusCode,
    showStatus,
    showProgress,
    maxLength,
  } = props;

  const Header = (
    <View style={styles.formHeader}>
      <Text style={styles.title}>Add Country Routing</Text>

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
        <Text style={styles.controlLabel}>Network Prefix:</Text>

        <View style={styles.crAutoWidth}>
          <View style={styles.textfield}>
            <AutocompleteField
              initialValue={initNetPrefix}
              dataSet={netPrefixDataSet}
              onChange={(v) => setNetworkPrefix(v)}
            />
          </View>
        </View>
      </View>

      {selectedPrefix && (
        <View style={styles.formGroup}>
          <Text style={styles.controlLabel}>Phone Prefix:</Text>

          <View style={[styles.textfield, styles.addNumRouting]}>
            <View style={{ width: 84 }}>
              <InputSFieldOne
                value={selectedPrefix ?? ""}
                outlineStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRightWidth: 0,
                }}
              />
            </View>

            <View
              style={{
                minWidth: 90,
                maxWidth: 156,
                width: "100%",
              }}
            >
              <InputFieldOne
                value={extraPrefix?.trim()}
                onChangeText={setExtraPrefix}
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
      )}

      {selectedPrefix && (
        <View style={styles.formGroup}>
          <Text style={styles.controlLabel}>Provider:</Text>

          <View style={styles.crAutoWidth}>
            <View style={styles.textfield}>
              <AutocompleteField
                initialValue={initProv.provider}
                dataSet={provDataSet}
                onChange={(v) => setProvider(v)}
              />
            </View>
          </View>
        </View>
      )}

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
          <Text style={styles.submitText}>Add New Route</Text>
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
