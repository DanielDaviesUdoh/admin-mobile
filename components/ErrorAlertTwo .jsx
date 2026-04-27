import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { statusMessagesTwo } from "@/constants/feedbackTwo";
import { getSpacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

const ErrorAlertTwo = ({ numError }) => {
  const { isSmallPhone, isTablet, isLandscape, fS, sS, rS } = useResponsive();

  const space = getSpacing({
    sS,
    isSmallPhone,
    isTablet,
    isLandscape,
  });

  const styles = getStyles({
    colors,
    typo,
    space,
    isSmallPhone,
    isTablet,
    fS,
    rS,
  });

  const aliasStatusMessage = {
    ...statusMessagesTwo,

    "Request failed with status code 404": {
      arialive: "assertive",
      title: "Error",
      color: colors.errorAlertTwo.error_text,
      message: "Number is not valid",
    },
  };

  const feedback = aliasStatusMessage[numError] || {
    arialive: "assertive",
    title: "Error",
    color: colors.errorAlertTwo.error_text,
    message: "An unknown error occurred.",
  };

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion={feedback.arialive}
      style={styles.container}
    >
      <View style={styles.alertBox}>
        <Text style={[styles.text, { color: feedback.color }]}>
          {feedback.title}: {feedback.message}
        </Text>
      </View>
    </View>
  );
};

export default ErrorAlertTwo;

const getStyles = ({ colors, typo, space, isSmallPhone, isTablet, fS, rS }) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: space.sm,
      paddingVertical: space.xs,
    },

    alertBox: {
      width: "100%",
      maxWidth: isTablet ? 700 : "100%",
      backgroundColor: colors.errorAlertTwo.background,
      borderWidth: 1,
      borderColor: colors.errorAlertTwo.border_clr,
      borderLeftWidth: rS(4),
      borderLeftColor: colors.errorAlertTwo.error_text,
      borderRadius: rS(isTablet ? 14 : 10),
      paddingHorizontal: space.md,
      paddingVertical: isSmallPhone ? space.sm : space.md,

      shadowColor: colors.errorAlertTwo.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: rS(4),
      elevation: 2,
    },

    text: {
      fontSize: fS(isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4),
      lineHeight: fS(isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5),
      textAlign: "center",
      fontWeight: "500",
    },
  });
};
