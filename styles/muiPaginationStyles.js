import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useMuiPaginationStyles = () => {
  const { isTablet, isSmallPhone, isLandscape } = useResponsive();

  return useMemo(() => {
    const iconSize = isTablet ? 26 : isSmallPhone ? 18 : 22;

    return StyleSheet.create({
      iconSize,

      wrapper: {
        width: "100%",
        backgroundColor: colors.muiPagination.wrapper_bg,
        alignItems: isTablet ? "center" : "stretch",
      },

      container: {
        width: "100%",
        maxWidth: isTablet ? 700 : "100%",
        flexDirection: isTablet ? "row" : isLandscape ? "row" : "column",
        justifyContent: "space-between",
        backgroundColor: colors.muiPagination.container_bg,
        borderRadius: isTablet ? 10 : 8,
        borderWidth: 1,
        borderColor: colors.muiPagination.border_clr,
        paddingHorizontal: spacing.sm3,
        paddingVertical: spacing.sm3,
        gap: spacing.sm3,

        elevation: 2,
        shadowColor: colors.muiPagination.shadow,
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },

      left: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: isSmallPhone && !isLandscape ? "flex-start" : "center",
        gap: spacing.xs2,
      },

      caption: {
        fontSize: isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4,
        color: colors.muiPagination.caption_text,
        fontFamily: platformFonts.regular,
      },

      pickerItem: {
        fontSize: isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4,
      },

      right: {
        alignItems: "flex-end",
      },

      rangeText: {
        fontSize: isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4,
        color: colors.muiPagination.body_text,
        fontFamily: platformFonts.bold,
      },

      controls: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: spacing.xs3,
      },

      button: {
        width: isTablet ? 42 : isSmallPhone ? 34 : 38,
        height: isTablet ? 42 : isSmallPhone ? 34 : 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: colors.muiPagination.button_bg,
      },

      buttonPressed: {
        backgroundColor: colors.muiPagination.button_pressed_bg,
        transform: [{ scale: 0.95 }],
      },

      buttonDisabled: {
        backgroundColor: colors.muiPagination.button_disabled_bg,
      },
    });
  }, [isTablet, isLandscape, isSmallPhone]);
};
