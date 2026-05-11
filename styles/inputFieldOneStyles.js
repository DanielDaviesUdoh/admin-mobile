import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useInputFieldOneStyles = () => {
  const { isTablet, isSmallPhone } = useResponsive();

  return useMemo(() => {
    const inputHeight = isTablet ? 48 : 44;

    const fontSize = isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4;

    const borderRadius = isTablet ? 8 : 6;

    return StyleSheet.create({
      style: {
        backgroundColor: colors.inputField.global_white_clr,
        height: inputHeight,
        paddingVertical: 1,
      },

      styleS: {
        backgroundColor: colors.inputField.input_bg,
        height: inputHeight,
        paddingVertical: 1,
      },

      outlineStyle: {
        borderRadius,
        borderWidth: 1,
      },

      contentStyle: {
        fontSize,
        color: colors.inputField.body_text,
        fontFamily: platformFonts.medium,
        includeFontPadding: false, // Android
      },

      theme: {
        colors: {
          primary: colors.inputField.select_outline_clr,
          outline: colors.inputField.select_border_clr,
          background: colors.inputField.global_white_clr,
          text: colors.inputField.body_text,
          placeholder: colors.inputField.plchd_clr,
        },
      },

      themeS: {
        colors: {
          primary: "transparent",
          outline: colors.inputField.select_border_clr,
          background: colors.inputField.input_bg,
          text: colors.inputField.body_text,
          placeholder: colors.inputField.plchd_clr,
        },
      },
    });
  }, [isTablet, isSmallPhone]);
};
