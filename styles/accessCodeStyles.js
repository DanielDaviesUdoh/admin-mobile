import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useAccessCodeStyles = () => {
  const { fS, sS, rS, htS, isTablet, isSmallPhone, isLandscape } =
    useResponsive();

  // const spacing = useMemo(
  //   () =>
  //     getSpacing({
  //       sS,
  //       isSmallPhone,
  //       isTablet,
  //       isLandscape,
  //     }),
  //   [sS, isSmallPhone, isTablet, isLandscape],
  // );

  return useMemo(() => {
    const titleFontSize = isTablet ? typo.t9 : isSmallPhone ? typo.t7 : typo.t8;

    const infoFontSize = isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5;

    const buttonFontSize = isTablet
      ? typo.t5
      : isSmallPhone
        ? typo.t3
        : typo.t4;

    return StyleSheet.create({
      container: {
        flex: 1,
        // backgroundColor: colors.aCodeStyles.offWhite,
        paddingHorizontal: isTablet ? spacing.xl : spacing.lg,
        paddingTop: isTablet ? 40 : isSmallPhone ? 24 : 30,
        paddingBottom: isTablet ? 40 : isSmallPhone ? 24 : 30,
      },

      subcont: {
        alignSelf: "center",
        paddingVertical: spacing.sm3,
        paddingHorizontal: isTablet ? spacing.md1 : spacing.sm2,
        borderWidth: 1,
        borderColor: colors.aCodeStyles.border_clr,
        marginBottom: spacing.md1,
      },

      title: {
        paddingBottom: spacing.sm1,
        marginBottom: spacing.md1,
        borderBottomWidth: 1,
        borderBottomColor: colors.aCodeStyles.border_clr,
        textTransform: "uppercase",
      },

      titleText: {
        fontSize: titleFontSize,
        lineHeight: titleFontSize * 1.25,
        fontFamily: platformFonts.bold,
        color: colors.aCodeStyles.body_text,
        includeFontPadding: false, // Android
      },

      info: {
        marginBottom: spacing.md1,
      },

      infoName: {
        fontSize: infoFontSize,
        lineHeight: infoFontSize * 1.3,
        fontFamily: platformFonts.medium,
        textTransform: "uppercase",
        color: colors.aCodeStyles.body_text,
        includeFontPadding: false, // Android
      },

      slantText: {
        fontStyle: "italic",
      },

      email: {
        marginTop: spacing.xxxs,
        fontSize: infoFontSize,
        lineHeight: infoFontSize * 1.3,
        color: colors.aCodeStyles.error_text,
        fontFamily: platformFonts.regular,
        includeFontPadding: false, // Android
      },

      infoType: {
        flexDirection: isLandscape && !isTablet ? "row" : "row",
        flexWrap: isSmallPhone ? "wrap" : "nowrap",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: isTablet ? spacing.xs1 : spacing.xs1,
        // marginLeft: -spacing.xxxs,
        rowGap: spacing.xs1,
      },

      inputCont: {
        width: isTablet ? 340 : isSmallPhone ? undefined : 280,
      },

      actions: {
        flexDirection: isSmallPhone ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: spacing.md1,
        rowGap: spacing.sm1,
        marginTop: spacing.sm3,
      },

      buttonCont: {
        paddingVertical: isTablet ? spacing.sm1 : spacing.xs3,
        paddingHorizontal: isTablet ? spacing.sm3 : spacing.sm2,
        borderRadius: isTablet ? rS(8) : rS(6),
        alignItems: "center",
        justifyContent: "center",
      },

      buttonText: {
        fontSize: buttonFontSize,
        lineHeight: buttonFontSize * 1.2,
        fontFamily: platformFonts.regular,
        color: colors.aCodeStyles.btn_text,
        includeFontPadding: false, // Android
      },
    });
  }, [fS, sS, rS, htS, spacing, isTablet, isSmallPhone, isLandscape]);
};
