import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { statusMessagesTwo } from "@/constants/feedbackTwo";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function FeedbackTwo({
  errorLocation = "",
  statusCode,
  textAlign = "left",
}) {
  const { isSmallPhone, isTablet } = useResponsive();

  const styles = getStyles({
    isSmallPhone,
    isTablet,
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

const getStyles = ({ isSmallPhone, isTablet }) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      marginBottom: spacing.sm2,
      alignItems: "center",
    },

    feedbackBox: {
      width: "100%",
      backgroundColor: colors.feedbackTwo.background,
      borderWidth: 1,
      borderColor: colors.feedbackTwo.border_clr,
      borderLeftWidth: 4,
      borderLeftColor: colors.feedbackTwo.error_text,
      borderRadius: isTablet ? 14 : 10,
      paddingHorizontal: spacing.sm2,
      paddingVertical: isSmallPhone ? spacing.md1 : spacing.sm2,

      shadowColor: colors.feedbackTwo.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },

    text: {
      fontSize: isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5,
      lineHeight: isTablet ? typo.t7 : isSmallPhone ? typo.t5 : typo.t6,
      fontWeight: "500",
    },
  });
};
