import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function ScreenWrap({
  pageTitle,
  children,
  showButton = false,
  buttonTitle,
  buttonFunc,
}) {
  const { isSmallPhone, isTablet, isLandscape, fS, rS } = useResponsive();

  const styles = getStyles({
    colors,
    platformFonts,
    typo,
    spacing,
    isSmallPhone,
    isTablet,
    isLandscape,
    fS,
    rS,
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleButton}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.text}>
            {pageTitle}
          </Text>

          <View style={styles.underline} />
        </View>

        {showButton && (
          <Pressable
            onPress={buttonFunc}
            style={({ pressed }) => [
              styles.buttonCont,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>{buttonTitle}</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
}

const getStyles = ({
  colors,
  platformFonts,
  typo,
  spacing,
  isSmallPhone,
  isTablet,
  rS,
}) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screenWrap.background,
      paddingHorizontal: isTablet
        ? spacing.md2
        : isSmallPhone
          ? spacing.sm1
          : spacing.sm3,
      paddingTop: isTablet
        ? spacing.sm1
        : isSmallPhone
          ? spacing.xs2
          : spacing.xs3,
      paddingBottom: isTablet
        ? spacing.lg2
        : isSmallPhone
          ? spacing.sm3
          : spacing.md2,
    },

    titleButton: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: isTablet
        ? spacing.lg2
        : isSmallPhone
          ? spacing.sm3
          : spacing.md2,
    },

    titleContainer: {
      alignSelf: "flex-start",
    },

    text: {
      color: colors.screenWrap.title_text,
      textTransform: "uppercase",
      fontSize: isTablet ? typo.t10 : isSmallPhone ? typo.t7 : typo.t8,
      lineHeight: isTablet ? typo.t11 : isSmallPhone ? typo.t8 : typo.t9,
      fontFamily: platformFonts.bold,
      letterSpacing: 0.5,
    },

    underline: {
      marginTop: spacing.xs1 / 2,
      width: "100%",
      height: 3,
      backgroundColor: colors.screenWrap.underline,
    },

    buttonCont: {
      // alignSelf: isSmallPhone && !isLandscape ? "flex-start" : "center",
      // minHeight: isTablet ? 44 : 38,
      paddingVertical: isTablet
        ? spacing.sm1
        : isSmallPhone
          ? spacing.xs1
          : spacing.xs2,
      paddingHorizontal: isTablet
        ? spacing.md1
        : isSmallPhone
          ? spacing.xs3
          : spacing.sm2,
      borderRadius: rS(isTablet ? 8 : 6),
      backgroundColor: colors.screenWrap.button_bg,
      justifyContent: "center",
      alignItems: "center",

      // shadowColor: colors.screenWrap.shadow,
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.08,
      // shadowRadius: rS(4),
      // elevation: 2,
    },

    buttonPressed: {
      backgroundColor: colors.screenWrap.button_pressed_bg,
      transform: [{ scale: 0.97 }],
    },

    buttonText: {
      fontSize: isTablet ? typo.t4 : isSmallPhone ? typo.t2 : typo.t3,
      fontFamily: platformFonts.regular,
      color: colors.screenWrap.button_text,
      textAlign: "center",
    },

    childrenContainer: {
      flex: 1,
      width: "100%",
    },
  });
};
