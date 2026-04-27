import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { getSpacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export const useTablePanelStyles = () => {
  const { isSmallPhone, isTablet, isLandscape, fS, sS, rS } = useResponsive();

  const space = getSpacing({
    sS,
    isSmallPhone,
    isTablet,
    isLandscape,
  });

  return useMemo(() => {
    const borderRadius = rS(isTablet ? 10 : 6);

    const headingFontSize = fS(
      isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4,
    );

    const bodyFontSize = fS(
      isTablet ? typo.t4 : isSmallPhone ? typo.t2 : typo.t3,
    );

    const buttonFontSize = fS(
      isTablet ? typo.t3 : isSmallPhone ? typo.t1 : typo.t2,
    );

    return StyleSheet.create({
      /* ---------- PANEL ---------- */
      panel: {
        width: "100%",
        marginBottom: space.lg,
        backgroundColor: colors.tablePanel.panel_bg,
        borderRadius: borderRadius,
        borderWidth: 1,
        borderColor: colors.tablePanel.panel_border,
        overflow: "hidden",

        shadowColor: colors.tablePanel.shadow,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: rS(3),
        elevation: 2,
      },

      panelPrimary: {
        borderColor: colors.tablePanel.primary_border,
      },

      panelHeading: {
        paddingVertical: isTablet ? space.sm : space.xs,
        paddingHorizontal: isTablet ? space.md : space.sm,
        backgroundColor: colors.tablePanel.heading_bg,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      },

      panelHeadingText: {
        color: colors.tablePanel.heading_text,
        fontSize: headingFontSize,
        fontFamily: platformFonts.bold,
        lineHeight: headingFontSize * 1.3,
      },

      /* ---------- TABLE ---------- */
      thead: {
        backgroundColor: colors.tablePanel.table_head_bg,
      },

      row: {
        flexDirection: "row",
        minHeight: isTablet ? sS(42) : isSmallPhone ? sS(32) : sS(36),
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.tablePanel.row_border,
      },

      evenRow: {
        backgroundColor: colors.tablePanel.even_row_bg,
      },

      /* ---------- CELLS ---------- */
      cell: {
        justifyContent: "center",
        paddingHorizontal: isTablet ? space.md : space.sm,
        paddingVertical: isTablet ? space.sm : space.xs,
      },

      thText: {
        fontSize: bodyFontSize,
        color: colors.tablePanel.header_text,
        fontFamily: platformFonts.bold,
        textTransform: "capitalize",
        lineHeight: bodyFontSize * 1.3,
      },

      tdText: {
        fontSize: bodyFontSize,
        color: colors.tablePanel.body_text,
        fontFamily: platformFonts.regular,
        lineHeight: bodyFontSize * 1.35,
      },

      /* ---------- STATES ---------- */
      prefixMismatch: {
        backgroundColor: colors.tablePanel.prefix_mismatch_bg,
      },

      emptyText: {
        paddingHorizontal: isTablet ? space.md : space.sm,
        paddingVertical: isTablet ? space.md : space.sm,
        fontSize: headingFontSize,
        color: colors.tablePanel.empty_text,
        fontFamily: platformFonts.regular,
      },

      buttonCont: {
        alignSelf: "flex-start",
        minHeight: isTablet ? sS(34) : sS(28),
        justifyContent: "center",
        paddingVertical: isTablet ? space.xs : space.xxs,
        paddingHorizontal: isTablet ? space.sm : space.xs,
        borderRadius: rS(isTablet ? 6 : 4),
        backgroundColor: colors.tablePanel.button_bg,
      },

      buttonContPressed: {
        backgroundColor: colors.tablePanel.button_pressed_bg,
        transform: [{ scale: 0.97 }],
      },

      buttonText: {
        color: colors.tablePanel.button_text,
        fontSize: buttonFontSize,
        fontFamily: platformFonts.regular,
        lineHeight: buttonFontSize * 1.2,
      },
    });
  }, [isSmallPhone, isTablet, fS, sS, rS, space]);
};
