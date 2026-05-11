import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export const useTablePanelStyles = () => {
  const { isSmallPhone, isTablet } = useResponsive();

  return useMemo(() => {
    const borderRadius = isTablet ? 10 : 6;

    const headingFontSize = isTablet
      ? typo.t5
      : isSmallPhone
        ? typo.t3
        : typo.t4;
    const bodyFontSize = isTablet ? typo.t4 : isSmallPhone ? typo.t2 : typo.t3;
    const buttonFontSize = isTablet
      ? typo.t3
      : isSmallPhone
        ? typo.t1
        : typo.t2;
    return StyleSheet.create({
      panel: {
        alignSelf: "flex-start",
        marginBottom: spacing.md3,
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
        shadowRadius: 3,
        elevation: 2,
      },

      panelPrimary: {
        borderColor: colors.tablePanel.primary_border,
      },

      panelHeading: {
        paddingVertical: isTablet ? spacing.sm2 : spacing.sm1,
        paddingHorizontal: isTablet ? spacing.sm2 : spacing.sm1,
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
        minHeight: isTablet ? 38 : isSmallPhone ? 32 : 36,
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
        paddingHorizontal: isTablet ? spacing.md1 : spacing.sm3,
        paddingVertical: isTablet ? spacing.sm1 : spacing.xs2,
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
        paddingVertical: isTablet ? spacing.sm2 : spacing.sm1,
        paddingHorizontal: isTablet ? spacing.sm2 : spacing.sm1,
        fontSize: headingFontSize,
        color: colors.tablePanel.empty_text,
        fontFamily: platformFonts.regular,
      },

      buttonCont: {
        alignSelf: "flex-start",
        minHeight: isTablet ? 34 : 28,
        justifyContent: "center",
        paddingVertical: isTablet ? spacing.xs2 : spacing.xs1,
        paddingHorizontal: isTablet ? spacing.sm2 : spacing.sm1,
        borderRadius: isTablet ? 6 : 4,
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

      headerCellSsmSQ: {
        flexShrink: 0,
      },

      totalContainerSsmSQ: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      },

      timerTextSsmSQ: {
        color: "blue",
      },
      /* ---------- SENDER IDR TABLE ---------- */

      defaultHeaderCell: {
        minWidth: 140,
      },

      actionHeaderCell: {
        minWidth: 220,
      },

      defaultCell: {
        minWidth: 140,
      },

      actionCell: {
        minWidth: 220,
      },

      actionContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
      },

      actionButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingVertical: isTablet ? spacing.xs2 : spacing.xs1,
        paddingHorizontal: isTablet ? spacing.sm1 : spacing.xs2,
        borderRadius: isTablet ? 6 : 4,
      },

      actionButtonPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.97 }],
      },

      editButton: {
        backgroundColor: colors.tablePanel.even_row_bg,
      },

      deleteButton: {
        backgroundColor: colors.tablePanel.even_row_bg,
      },

      editButtonText: {
        color: "#3F51B5",
        fontSize: buttonFontSize,
        fontFamily: platformFonts.regular,
      },

      deleteButtonText: {
        color: "#EF4444",
        fontSize: buttonFontSize,
        fontFamily: platformFonts.regular,
      },

      feedbackText: {
        fontSize: buttonFontSize,
        color: colors.tablePanel.body_text,
        fontFamily: platformFonts.regular,
      },
    });
  }, [isSmallPhone, isTablet]);
};
