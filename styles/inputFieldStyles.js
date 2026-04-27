import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useInputFieldStyles = () => {
  const { isTablet, isSmallPhone } = useResponsive();

  return useMemo(() => {
    const inputHeight = isTablet ? 56 : 52;

    const inputFontSize = isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4;

    const warnFontSize = isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4;

    return StyleSheet.create({
      style: {
        backgroundColor: colors.inputField.input_bg,
        marginBottom: isTablet
          ? typo.sm2
          : isSmallPhone
            ? typo.xs3
            : spacing.sm1,
        marginTop: isTablet ? typo.sm2 : isSmallPhone ? typo.xs3 : spacing.sm1,
        height: inputHeight,
      },

      contentStyle: {
        fontSize: inputFontSize,
        lineHeight: inputFontSize * 1.3,
        color: colors.inputField.body_text,
        fontFamily: platformFonts.medium,
        paddingHorizontal: spacing.xs3,
        paddingVertical: isTablet ? spacing.sm1 : spacing.xs3,
        includeFontPadding: false, // Android
      },

      theme: {
        colors: {
          primary: "transparent",
          outline: "transparent",
          background: colors.inputField.input_bg,
          text: colors.inputField.body_text,
          placeholder: colors.inputField.plchd_clr,
        },
      },

      warntypeCont: {
        alignItems: "center",
        marginBottom: isTablet
          ? spacing.sm1
          : isSmallPhone
            ? spacing.xs2
            : spacing.xs3,
        // paddingHorizontal: spacing.sm,
      },

      warntype: {
        color: colors.inputField.error_text,
        fontSize: warnFontSize,
        lineHeight: warnFontSize * 1.3,
        fontFamily: platformFonts.regular,
        textAlign: "center",
        includeFontPadding: false, // Android
      },

      iconSize: isTablet ? 26 : isSmallPhone ? 22 : 24,
      iconColor: colors.inputField.icon_bgclr,
    });
  }, [isTablet, isSmallPhone]);
};
