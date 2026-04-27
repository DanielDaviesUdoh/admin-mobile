import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { statusMessagesTwo } from "@/constants/feedbackTwo";
import { getSpacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function FeedbackTwo({
  errorLocation = "",
  statusCode,
  textAlign = "left",
}) {
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

  const feedback = statusMessagesTwo[statusCode] || {
    title: "Error",
    color: colors.feedbackTwo.error_text,
    message: "An unknown error occurred.",
  };

  const renderErrorLocation =
    errorLocation?.slice(0, 1)?.toUpperCase() + errorLocation?.slice(1);

  return (
    <View style={styles.container}>
      <View style={styles.feedbackBox}>
        <Text
          accessible
          accessibilityRole="alert"
          style={[
            styles.text,
            {
              color: feedback?.color || colors.feedbackTwo.error_text,
              textAlign,
            },
          ]}
        >
          {errorLocation ? `${renderErrorLocation} ` : ""}
          {feedback?.title}: {feedback?.message}
        </Text>
      </View>
    </View>
  );
}

const getStyles = ({ colors, typo, space, isSmallPhone, isTablet, fS, rS }) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      marginBottom: space.md,
      alignItems: "center",
    },

    feedbackBox: {
      width: "100%",
      backgroundColor: colors.feedbackTwo.background,
      borderWidth: 1,
      borderColor: colors.feedbackTwo.border_clr,
      borderLeftWidth: rS(4),
      borderLeftColor: colors.feedbackTwo.error_text,
      borderRadius: rS(isTablet ? 14 : 10),
      paddingHorizontal: space.md,
      paddingVertical: isSmallPhone ? space.sm : space.md,

      shadowColor: colors.feedbackTwo.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: rS(4),
      elevation: 2,
    },

    text: {
      fontSize: fS(isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5),
      lineHeight: fS(isTablet ? typo.t7 : isSmallPhone ? typo.t5 : typo.t6),
      fontWeight: "500",
    },
  });
};
