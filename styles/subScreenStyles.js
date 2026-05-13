import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useSubScreenStyles = () => {
  const { isTablet, isSmallPhone } = useResponsive();
  const textFontSize = isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5;

  return useMemo(() => {
    return StyleSheet.create({
      cont: { flex: 1 },
      textfieldCont: {
        width: isTablet ? 340 : isSmallPhone ? undefined : 280,
      },
      tableCont: {
        flex: 1,
        minHeight: 0,
      },
      noNetwork: {
        color: colors.subScreen.body_text,
        fontSize: textFontSize,
        fontFamily: platformFonts.regular,
        lineHeight: textFontSize * 1.2,
      },
    });
  }, [isTablet, isSmallPhone, textFontSize]);
};
