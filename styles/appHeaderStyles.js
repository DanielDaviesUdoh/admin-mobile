// appHeaderStyles.js
import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useAppHeaderStyles = () => {
  const { isSmallPhone, isTablet } = useResponsive();

  return useMemo(() => {
    return StyleSheet.create({
      headerCont: {
        minHeight: isTablet ? 64 : isSmallPhone ? 48 : 56,
        backgroundColor: colors.aHeaderStyles.header_bgclr,
        paddingHorizontal: isTablet
          ? spacing.sm3
          : isSmallPhone
            ? spacing.xs1
            : spacing.xs3,
        paddingVertical: isTablet
          ? spacing.sm3
          : isSmallPhone
            ? spacing.xs1
            : spacing.xs3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: colors.aHeaderStyles.border_clr,
      },

      menuLogo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        minWidth: 0,
      },

      menuButton: {
        width: isTablet ? 48 : isSmallPhone ? 36 : 42,
        height: isTablet ? 48 : isSmallPhone ? 36 : 42,
        borderRadius: isTablet ? 24 : isSmallPhone ? 18 : 21,
        alignItems: "center",
        justifyContent: "center",
        marginRight: isTablet
          ? spacing.sm1
          : isSmallPhone
            ? spacing.xs1
            : spacing.xs2,
      },

      logoCont: {
        flex: 1,
        minWidth: 0,
      },

      logoText: {
        color: colors.aHeaderStyles.global_white_clr,
        fontSize: isTablet ? typo.t7 : isSmallPhone ? typo.t3 : typo.t5,
        fontFamily: platformFonts.bold,
      },

      userAction: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: isTablet ? spacing.sm3 : isSmallPhone ? spacing.xs2 : spacing.sm1,
        marginLeft: isTablet
          ? spacing.sm3
          : isSmallPhone
            ? spacing.xs2
            : spacing.sm1,
      },

      userInfo: {
        alignItems: "flex-end",
      },

      user: {
        color: colors.aHeaderStyles.global_white_clr,
        fontSize: isTablet ? typo.t5 : isSmallPhone ? typo.t2 : typo.t3,
        fontFamily: platformFonts.bold,
      },

      action: {
        color: colors.aHeaderStyles.global_white_clr,
        fontSize: isTablet ? typo.t4 : isSmallPhone ? typo.t2 : typo.t3,
        marginTop: isTablet
          ? spacing.sm1
          : isSmallPhone
            ? spacing.xs1
            : spacing.xs1,
        fontFamily: platformFonts.regular,
      },

      moreButton: {
        width: isTablet ? 48 : isSmallPhone ? 36 : 42,
        height: isTablet ? 48 : isSmallPhone ? 36 : 42,
        borderRadius: isTablet ? 24 : isSmallPhone ? 18 : 21,
        alignItems: "center",
        justifyContent: "center",
      },
    });
  }, [isSmallPhone, isTablet]);
};
