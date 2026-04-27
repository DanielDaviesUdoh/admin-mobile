import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useLoginStyles = () => {
  const { isTablet, isSmallPhone } = useResponsive();

  return useMemo(() => {
    const iconSize = isTablet ? 56 : isSmallPhone ? 44 : 50;

    const buttonFontSize = isTablet
      ? typo.t6
      : isSmallPhone
        ? typo.t4
        : typo.t5;

    const spinFontSize = isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4;

    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.login.offWhite,
        paddingHorizontal: isTablet ? spacing.md3 : spacing.md1,
        paddingTop: isTablet ? 28 : isSmallPhone ? 12 : 15,
      },

      subcont: {
        alignSelf: "center",
        position: "relative",
        backgroundColor: colors.login.offWhite,
        paddingHorizontal: isTablet ? spacing.lg1 : spacing.md3,
        paddingTop: isTablet ? 48 : isSmallPhone ? 36 : 40,
        paddingBottom: isTablet ? spacing.lg1 : spacing.md3,
        borderRadius: isTablet ? 14 : 10,

        shadowColor: "#000",
        shadowRadius: isTablet ? 8 : 4,
        shadowOpacity: 0.15,
        shadowOffset: {
          width: 0,
          height: isTablet ? 6 : 4,
        },
        elevation: isTablet ? 8 : 5,
      },

      inputCont: {
        width: isTablet ? 340 : isSmallPhone ? undefined : 280,
      },

      icon: {
        position: "absolute",
        alignSelf: "center",
        top: -(iconSize / 2),
        zIndex: 20,
        width: iconSize,
        height: iconSize,
        borderRadius: iconSize / 2,
        backgroundColor: colors.login.icon_bgclr,
        justifyContent: "center",
        alignItems: "center",
      },

      spinCont: {
        alignSelf: isSmallPhone ? "stretch" : "flex-start",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: spacing.sm,
      },

      spinText: {
        color: colors.login.body_text,
        marginLeft: spacing.sm,
        fontSize: spinFontSize,
        lineHeight: spinFontSize * 1.3,
        fontFamily: platformFonts.regular,
        includeFontPadding: false, // Android
      },

      button: {
        minHeight: isTablet ? 52 : 48,
        paddingVertical: isTablet ? spacing.sm : spacing.xs,
        paddingHorizontal: spacing.lg,
        borderRadius: isTablet ? 10 : 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: spacing.xs3,
      },

      buttonText: {
        color: colors.login.btn_text,
        fontSize: buttonFontSize,
        lineHeight: buttonFontSize * 1.2,
        textTransform: "uppercase",
        fontFamily: platformFonts.medium,
        includeFontPadding: false, // Android
      },
    });
  }, [isTablet, isSmallPhone]);
};
