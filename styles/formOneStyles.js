import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useFormOneStyles = () => {
  const { isTablet, isSmallPhone } = useResponsive();

  return useMemo(() => {
    const buttonFontSize = isTablet ? typo.t5 : typo.t4;

    return StyleSheet.create({
      formCont: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: isTablet ? 14 : isSmallPhone ? 8 : 10,
      },

      formGroup: {
        flexBasis: isTablet ? "48%" : isSmallPhone ? "100%" : "100%",
        minWidth: isTablet ? 180 : 140,
        maxWidth: isTablet ? 340 : isSmallPhone ? undefined : 280,
        flexDirection: "row",
        alignItems: "center",
      },

      formGroupColGap: {
        columnGap: 4,
      },

      textfield: {
        width: isTablet ? 310 : isSmallPhone ? undefined : 250,
      },
      buttonCont: {
        minWidth: isTablet ? 66 : 60,
        height: isTablet ? 36 : 32,
        paddingVertical: isTablet
          ? spacing.xs3
          : isSmallPhone
            ? spacing.xs1
            : spacing.xs2,
        paddingHorizontal: isTablet
          ? spacing.sm3
          : isSmallPhone
            ? spacing.xs1
            : spacing.sm2,
        borderRadius: spacing.xs2,
        backgroundColor: colors.btn_bg,

        justifyContent: "center",
        alignItems: "center",

        alignSelf: "flex-start",
        marginTop: isTablet
          ? spacing.sm2
          : isSmallPhone
            ? spacing.xs3
            : spacing.sm1,
        marginBottom: isTablet
          ? spacing.lg3
          : isSmallPhone
            ? spacing.lg1
            : spacing.lg2,
      },

      buttonText: {
        fontSize: buttonFontSize,
        fontFamily: platformFonts.regular,
        color: colors.btn_text,
      },
    });
  }, [isTablet, isSmallPhone]);
};
