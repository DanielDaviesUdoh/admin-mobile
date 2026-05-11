import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function SearchFeedback({ text }) {
  const { isSmallPhone, isTablet } = useResponsive();

  const styles = getStyles({
    isSmallPhone,
    isTablet,
  });

  return (
    <View style={styles.container}>
      <View style={styles.feedbackBox}>
        <Text style={styles.text}>Search text does not match any {text}</Text>
      </View>
    </View>
  );
}

const getStyles = ({ isSmallPhone, isTablet }) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.xs3,
      paddingVertical: spacing.xs3,
    },

    feedbackBox: {
      width: "100%",
      maxWidth: isTablet ? 720 : "100%",
      backgroundColor: colors.searchFeedback.background,
      borderWidth: 1,
      borderColor: colors.searchFeedback.border_clr,
      borderLeftWidth: 4,
      borderLeftColor: colors.searchFeedback.highlight,
      borderRadius: isTablet ? 14 : 10,
      paddingHorizontal: spacing.sm2,
      paddingVertical: isSmallPhone ? spacing.xs3 : spacing.sm2,

      shadowColor: colors.searchFeedback.shadow,
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
      color: colors.searchFeedback.body_text,
      textAlign: "center",
      fontWeight: "500",
    },
  });
};
