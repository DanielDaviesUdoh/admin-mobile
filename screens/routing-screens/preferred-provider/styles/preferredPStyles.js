import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const usePreferredPStyles = () => {
  const { isTablet, isSmallPhone } = useResponsive();
  const titleFontSize = isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5;
  const radioBFontSize = isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4;

  return useMemo(() => {
    return StyleSheet.create({
      rbuttonsCont: {
        alignSelf: isTablet ? "center" : "flex-start",
        marginBottom: 8,
        flexDirection: isTablet ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isTablet ? 12 : 0,
      },
      radioTitle: {
        alignSelf: !isTablet && "flex-start",
        marginLeft: !isTablet && 8,
        color: colors.subScreen.body_text,
        fontSize: titleFontSize,
        fontFamily: platformFonts.bold,
        lineHeight: titleFontSize * 1.2,
      },
      radioCont: { flexDirection: "row" },
      radioBText: {
        color: colors.subScreen.body_text,
        fontSize: radioBFontSize,
        fontFamily: platformFonts.regular,
        lineHeight: radioBFontSize * 1.2,
      },
    });
  }, [isTablet, radioBFontSize, titleFontSize]);
};
