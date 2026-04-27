import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { getSpacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function SearchFeedback({ text }) {
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

  return (
    <View style={styles.container}>
      <View style={styles.feedbackBox}>
        <Text style={styles.text}>Search text does not match any {text}</Text>
      </View>
    </View>
  );
}

const getStyles = ({ colors, typo, space, isSmallPhone, isTablet, fS, rS }) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: space.sm,
      paddingVertical: space.sm,
    },

    feedbackBox: {
      width: "100%",
      maxWidth: isTablet ? 720 : "100%",
      backgroundColor: colors.searchFeedback.background,
      borderWidth: 1,
      borderColor: colors.searchFeedback.border_clr,
      borderLeftWidth: rS(4),
      borderLeftColor: colors.searchFeedback.highlight,
      borderRadius: rS(isTablet ? 14 : 10),
      paddingHorizontal: space.md,
      paddingVertical: isSmallPhone ? space.sm : space.md,

      shadowColor: colors.searchFeedback.shadow,
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
      color: colors.searchFeedback.body_text,
      textAlign: "center",
      fontWeight: "500",
    },
  });
};
