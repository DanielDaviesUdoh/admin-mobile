import { useFormStyles } from "@/styles/formStyles";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import AutocompleteFieldTwo from "@/components/auto-complete-fieldtwo";
import Feedback from "@/components/feedback";
import InputFieldOne from "@/components/input-field-one";
import InputSFieldOne from "@/components/input-sfield-one";

export default function useAddNumRFormSections(props) {
  const styles = useFormStyles();

  const {
    handleSubmit,
    initProv,
    prefixes,
    setPrefixes,
    prefixesDataSet,
    selectedPrefix,
    extraPrefix,
    setExtraPrefix,
    provBankRDataSet,
    provider,
    setProvider,
    maxLength,
    handleClose,
    statusCode,
    showStatus,
    showProgress,
  } = props;

  const isDisabled =
    !extraPrefix?.trim() || provider === initProv.provider || showProgress;

  const Header = (
    <View style={styles.formHeader}>
      <Text style={styles.title}>Add Number Routing</Text>

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
        <Text style={[styles.controlLabel, styles.widthAdjust]}>Prefixes:</Text>

        <View style={styles.textfield}>
          <AutocompleteFieldTwo
            dataSet={prefixesDataSet}
            value={prefixes}
            onChange={(v) => setPrefixes(v)}
          />
        </View>
      </View>

      {selectedPrefix && (
        <View style={styles.formGroup}>
          <Text style={[styles.controlLabel, styles.widthAdjust]}>Mobile:</Text>

          <View style={[styles.textfield, styles.addNumRouting]}>
            <View style={styles.addNumRW}>
              <InputSFieldOne
                value={selectedPrefix ?? ""}
                outlineStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRightWidth: 0,
                }}
              />
            </View>

            <View style={styles.addNumRWTwo}>
              <InputFieldOne
                value={extraPrefix?.trim()}
                onChangeText={setExtraPrefix}
                maxLength={maxLength}
                outlineStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  marginLeft: -8,
                }}
              />
            </View>
          </View>
        </View>
      )}

      {selectedPrefix && (
        <View style={styles.formGroup}>
          <Text style={[styles.controlLabel, styles.widthAdjust]}>
            Provider:
          </Text>

          <View style={styles.textfield}>
            <AutocompleteFieldTwo
              dataSet={provBankRDataSet}
              value={provider}
              onChange={(v) => setProvider(v)}
            />
          </View>
        </View>
      )}

      {showStatus && <Feedback statusCode={statusCode} />}
    </View>
  );

  const Footer = (
    <View style={styles.formFooter}>
      {selectedPrefix && (
        <Pressable
          onPress={handleSubmit}
          disabled={isDisabled}
          style={[styles.submit, styles.post, isDisabled && styles.disabled]}
        >
          {showProgress ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
        </Pressable>
      )}
    </View>
  );

  return [
    { key: "header", element: Header },
    { key: "body", element: Body },
    { key: "footer", element: Footer },
  ];
}
