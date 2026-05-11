import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function Loading({
  text = "Loading...",
  fontSize,
  align = "flex-start",
}) {
  const { isSmallPhone, isTablet } = useResponsive();

  const styles = getStyles({
    colors,
    typo,
    isSmallPhone,
    isTablet,
    align,
    fontSize,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const getStyles = ({
  colors,
  typo,
  isSmallPhone,
  isTablet,
  align,
  fontSize,
}) => {
  const resolvedFontSize = fontSize
    ? fontSize
    : isTablet
      ? typo.t6
      : isSmallPhone
        ? typo.t4
        : typo.t5;

  return StyleSheet.create({
    container: {
      width: "100%",
      alignItems: align,
      marginVertical: isSmallPhone ? spacing.xs1 : spacing.xs2,
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
