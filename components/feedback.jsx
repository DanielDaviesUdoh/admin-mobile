import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { statusMessages } from "@/constants/feedback";
import { getSpacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function Feedback({ statusCode, align = "center" }) {
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

  const feedback = statusMessages[statusCode] || {
    title: "Error",
    message: "An unknown error occurred.",
    severity: "error",
  };

  const severityStyle = styles[feedback.severity] || styles.error;

  return (
    <View
      style={[
        styles.container,
        {
          alignItems: align,
        },
      ]}
    >
      <View style={[styles.alert, severityStyle]}>
        <Text style={styles.title}>{feedback.title}</Text>
        <Text style={styles.message}>{feedback.message}</Text>
      </View>
    </View>
  );
}

const getStyles = ({ colors, typo, space, isSmallPhone, isTablet, fS, rS }) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      marginVertical: space.sm,
    },

    alert: {
      width: isTablet ? "80%" : "100%",
      maxWidth: isTablet ? 720 : "100%",
      paddingVertical: isSmallPhone ? space.sm : space.md,
      paddingHorizontal: space.md,
      borderRadius: rS(isTablet ? 14 : 10),
      borderWidth: 1,
      borderLeftWidth: rS(4),

      shadowColor: colors.feedback.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: rS(4),
      elevation: 2,
    },

    title: {
      fontSize: fS(isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5),
      fontWeight: "700",
      marginBottom: space.xxs,
    },

    message: {
      fontSize: fS(isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4),
      lineHeight: fS(isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5),
      fontWeight: "500",
    },

    success: {
      backgroundColor: colors.feedback.success_bg,
      borderColor: colors.feedback.success_border,
      borderLeftColor: colors.feedback.success_border,
    },

    warning: {
      backgroundColor: colors.feedback.warning_bg,
      borderColor: colors.feedback.warning_border,
      borderLeftColor: colors.feedback.warning_border,
    },

    error: {
      backgroundColor: colors.feedback.error_bg,
      borderColor: colors.feedback.error_border,
      borderLeftColor: colors.feedback.error_border,
    },

    info: {
      backgroundColor: colors.feedback.info_bg,
      borderColor: colors.feedback.info_border,
      borderLeftColor: colors.feedback.info_border,
    },
  });
};
