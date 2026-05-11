import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useFormStyles = () => {
  const { isTablet, isSmallPhone, isLandscape } = useResponsive();

  return useMemo(() => {
    const titleFontSize = isTablet ? typo.t7 : isSmallPhone ? typo.t5 : typo.t6;

    const labelFontSize = isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4;

    const buttonFontSize = isTablet
      ? typo.t5
      : isSmallPhone
        ? typo.t3
        : typo.t4;

    const closeFontSize = isTablet
      ? typo.t11
      : isSmallPhone
        ? typo.t9
        : typo.t10;

    return StyleSheet.create({
      formCont: {
        width: "100%",
      },

      formHeader: {
        paddingVertical: isTablet ? spacing.md3 : spacing.md1,
        paddingHorizontal: isTablet ? spacing.md3 : spacing.md1,
        borderBottomWidth: 1,
        borderBottomColor: colors.formStyles.border_clr,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },

      title: {
        flex: 1,
        paddingRight: spacing.sm3,
        fontSize: titleFontSize,
        lineHeight: titleFontSize * 1.25,
        fontFamily: platformFonts.medium,
        color: colors.formStyles.body_text,
        includeFontPadding: false, // Android
      },

      closeBtn: {
        fontSize: closeFontSize,
        lineHeight: closeFontSize,
        color: colors.formStyles.body_text,
        fontFamily: platformFonts.regular,
        includeFontPadding: false, // Android
      },

      formBody: {
        paddingTop: isTablet ? spacing.md2 : spacing.sm3,
        paddingBottom: spacing.sm3,
        paddingLeft: isTablet ? spacing.sm3 : spacing.sm3,
        paddingRight: isLandscape ? spacing.sm1 : 0,
      },

      formGroup: {
        flexDirection: "column",
        rowGap: spacing.xs2,
        marginBottom: spacing.md1,
      },

      controlLabel: {
        fontSize: labelFontSize,
        lineHeight: labelFontSize * 1.3,
        fontFamily: platformFonts.bold,
        color: colors.formStyles.body_text,
        includeFontPadding: false,
      },

      widthAdjust: {
        maxWidth: isTablet ? 110 : 80,
      },

      widthAdjustOne: {
        maxWidth: isTablet ? 100 : 75,
      },

      textfield: {
        width: isTablet ? 310 : isSmallPhone ? undefined : 250,
      },

      addNumRouting: {
        flexDirection: isSmallPhone ? "column" : "row",
        alignItems: isSmallPhone ? "flex-start" : "center",
        columnGap: spacing.xs1,
        rowGap: spacing.xs1,
      },

      addNumRW: {
        width: 85,
      },

      addNumRWTwo: {
        width: isTablet ? 220 : isSmallPhone ? undefined : 162.5,
      },

      showPrefixGroup: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: isSmallPhone ? "wrap" : "nowrap",
      },

      prefixCentered: {
        flex: 1,
        textAlign: "center",
      },

      formFooter: {
        paddingVertical: spacing.sm2,
        paddingHorizontal: isTablet ? spacing.lg : spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.formStyles.border_clr,
        alignItems: "flex-end",
      },

      submit: {
        minWidth: isTablet ? 90 : 80,
        borderRadius: isTablet ? 8 : 6,
        paddingVertical: isTablet ? spacing.sm2 : spacing.sm1,
        paddingHorizontal: isTablet ? spacing.md2 : spacing.xs3,
        alignItems: "center",
        justifyContent: "center",
      },

      submitText: {
        color: colors.formStyles.global_white_clr,
        fontSize: buttonFontSize,
        lineHeight: buttonFontSize * 1.2,
        fontFamily: platformFonts.medium,
        textTransform: "capitalize",
        includeFontPadding: false,
      },

      post: {
        backgroundColor: colors.formStyles.green,
        borderWidth: 1,
        borderColor: colors.formStyles.green,
      },

      postOne: {
        backgroundColor: colors.formStyles.btn_bg,
        borderWidth: 1,
        borderColor: colors.formStyles.select_outline_clr,
      },

      delete: {
        backgroundColor: colors.formStyles.error_text_pressed,
        borderWidth: 1,
        borderColor: colors.formStyles.error_text_pressed,
      },

      disabled: {
        opacity: 0.6,
      },
      longLabel: {
        maxWidth: 100,
      },
    });
  }, [isTablet, isSmallPhone, isLandscape]);
};
