import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { getSpacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function Loading({
  text = "Loading...",
  fontSize,
  align = "flex-start",
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
    align,
    fontSize,
  });

  return (
    <View style={styles.container}>
      <View style={styles.loadingBox}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const getStyles = ({
  colors,
  typo,
  space,
  isSmallPhone,
  isTablet,
  fS,
  rS,
  align,
  fontSize,
}) => {
  const resolvedFontSize = fontSize
    ? fS(fontSize)
    : fS(isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5);

  return StyleSheet.create({
    container: {
      width: "100%",
      alignItems: align,
      marginVertical: space.sm,
    },

    loadingBox: {
      width: isTablet ? "80%" : "100%",
      maxWidth: isTablet ? 720 : "100%",
      paddingHorizontal: space.md,
      paddingVertical: isSmallPhone ? space.sm : space.md,
      borderRadius: rS(isTablet ? 14 : 10),
      backgroundColor: colors.loading.background,
      borderWidth: 1,
      borderColor: colors.loading.border_clr,

      shadowColor: colors.loading.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: rS(4),
      elevation: 2,
    },

    text: {
      fontSize: resolvedFontSize,
      lineHeight: resolvedFontSize * 1.35,
      color: colors.loading.body_text,
      fontWeight: "500",
      textAlign:
        align === "center" ? "center" : align === "flex-end" ? "right" : "left",
    },
  });
};
