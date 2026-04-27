import AutocompleteField from "@/components/auto-complete-field";
import InputFieldOne from "@/components/input-field-one";
import CRadioButtonOne from "@/components/radio-button-one";
import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function RoutingFormJXS(props) {
  const {
    handleSubmit,
    selectedRadioBtn,
    setSelectedRadioBtn,
    ctryDataSet,
    setFieldCountryCode,
    handleSelectFocus,
    fieldPhoneOrPrefix,
    setFieldPhoneOrPrefix,
    handleTextFocus,
    provDataSet,
    setFieldProvider,
    disableFetchBtn,
    showProgData,
    showProgDataDesgPLongM,
  } = props;

  const { isTablet, isSmallPhone } = useResponsive();
  const styles = getStyles({ isTablet, isSmallPhone, spacing });

  const isDisabledData = disableFetchBtn() || showProgData;
  const isDisabledDataDesgPLongM = disableFetchBtn() || showProgDataDesgPLongM;

  return (
    <View style={styles.form}>
      <View style={styles.formGroup}>
        <CRadioButtonOne
          value="country code"
          status={selectedRadioBtn === "country code"}
          onPress={() => setSelectedRadioBtn("country code")}
        />
        <AutocompleteField
          label="Country Code"
          dataSet={ctryDataSet}
          onChange={(v) => setFieldCountryCode(v)}
          activeRadioBtn={"country code"}
          handleFocus={handleSelectFocus}
        />
      </View>
      <View style={styles.formGroup}>
        <CRadioButtonOne
          value="phone number or prefix"
          status={selectedRadioBtn === "phone number or prefix"}
          onPress={() => setSelectedRadioBtn("phone number or prefix")}
        />
        <InputFieldOne
          placeholder="Phone or Prefix"
          value={fieldPhoneOrPrefix.trim()}
          onChangeText={setFieldPhoneOrPrefix}
          activeRadioBtn={"phone number or prefix"}
          handleFocus={handleTextFocus}
        />
      </View>
      <View style={styles.formGroup}>
        <CRadioButtonOne
          value="provider"
          status={selectedRadioBtn === "provider"}
          onPress={() => setSelectedRadioBtn("provider")}
        />
        <AutocompleteField
          label="Provider"
          dataSet={provDataSet}
          onChange={(v) => setFieldProvider(v)}
          activeRadioBtn={"provider"}
          handleFocus={handleSelectFocus}
        />
      </View>
      <View>
        {selectedRadioBtn === "provider" ? (
          <Pressable
            style={[styles.buttonCont, { opacity: isDisabledData ? 0.75 : 1 }]}
            disabled={isDisabledData}
            onPress={handleSubmit}
          >
            {showProgDataDesgPLongM ? (
              <ActivityIndicator color={"#fff"} />
            ) : (
              <Text style={styles.buttonText}>Fetch</Text>
            )}
          </Pressable>
        ) : (
          <Pressable
            style={[
              styles.buttonCont,
              { opacity: isDisabledDataDesgPLongM ? 0.75 : 1 },
            ]}
            disabled={isDisabledDataDesgPLongM}
            onPress={handleSubmit}
          >
            {showProgData ? (
              <ActivityIndicator color={"#fff"} />
            ) : (
              <Text style={styles.buttonText}>Fetch</Text>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

function getStyles({ isTablet, isSmallPhone, spacing }) {
  return StyleSheet.create({
    form: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: isTablet ? 14 : isSmallPhone ? 8 : 10,
    },

    formGroup: {
      flexBasis: isTablet ? "48%" : isSmallPhone ? "100%" : "100%",
      minWidth: isTablet ? 180 : 140,
      maxWidth: isTablet ? 340 : isSmallPhone ? undefined : 280,
      flexDirection: "row",
      alignItems: "center",
    },
    buttonCont: {
      minWidth: isTablet ? 66 : 60,
      height: isTablet ? 36 : 32,
      paddingVertical: isTablet
        ? spacing.xs3
        : isSmallPhone
          ? spacing.xs1
          : spacing.xs2,
      paddingHorizontal: isTablet
        ? spacing.sm3
        : isSmallPhone
          ? spacing.xs1
          : spacing.sm2,
      borderRadius: spacing.xs2,
      backgroundColor: colors.btn_bg,

      justifyContent: "center",
      alignItems: "center",

      alignSelf: "flex-start",
      marginTop: isTablet
        ? spacing.sm2
        : isSmallPhone
          ? spacing.xs3
          : spacing.sm1,
      marginBottom: isTablet
        ? spacing.lg3
        : isSmallPhone
          ? spacing.lg1
          : spacing.lg2,
    },

    buttonText: {
      fontSize: 14,
      fontFamily: platformFonts.regular,
      color: colors.btn_text,
    },
  });
}
