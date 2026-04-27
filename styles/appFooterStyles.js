import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useAppFooterStyles = () => {
  const { isSmallPhone, isTablet } = useResponsive();

  return useMemo(() => {
    const footerHeight = isTablet ? 40 : isSmallPhone ? 28 : 32;

    const footerFontSize = isTablet
      ? typo.t4
      : isSmallPhone
        ? typo.t1
        : typo.t2;

    return StyleSheet.create({
      footerCont: {
        minHeight: footerHeight,
        paddingVertical: isTablet
          ? spacing.md1
          : isSmallPhone
            ? spacing.xs3
            : spacing.sm2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.aFooterStyles.offWhite,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.aFooterStyles.footer_hr,
        zIndex: 999,
      },

      footerText: {
        color: colors.aFooterStyles.footer_text,
        fontFamily: platformFonts.regular,
        fontSize: footerFontSize,
        lineHeight: footerFontSize * 1.2,
        textAlign: "center",
        includeFontPadding: false, // Android
        textAlignVertical: "center", // Android
      },
    });
  }, [isSmallPhone, isTablet]);
};
