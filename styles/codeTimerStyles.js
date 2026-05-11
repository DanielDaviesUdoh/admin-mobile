import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useCodeTimerStyles = () => {
  const { isTablet } = useResponsive();

  return useMemo(() => {
    const timerFontSize = isTablet ? typo.t6 : typo.t3;

    return StyleSheet.create({
      text: {
        alignSelf: "center",
        textAlign: "center",
        paddingHorizontal: spacing.sm1,
        fontSize: isTablet ? typo.t6 : typo.t3,
        lineHeight: timerFontSize * 1.35,
        fontFamily: platformFonts.regular,
        color: colors.codeTimer.body_text,
        includeFontPadding: false, // Android
      },

      strong: {
        fontFamily: platformFonts.bold,
        color: colors.codeTimer.body_text,
      },
    });
  }, [isTablet]);
};
