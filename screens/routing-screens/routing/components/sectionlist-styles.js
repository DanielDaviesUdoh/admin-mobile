import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { getSpacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export const useSectionlistTableStyles = () => {
  const { isSmallPhone, isTablet, isLandscape, fS, sS, rS } = useResponsive();

  const space = getSpacing({
    sS,
    isSmallPhone,
    isTablet,
    isLandscape,
  });

  return useMemo(() => {
    const horizontalPadding = isTablet
      ? space.md
      : isSmallPhone
        ? space.sm
        : space.md;

    const verticalPadding = isTablet
      ? space.sm
      : isSmallPhone
        ? space.xxs
        : space.xs;

    const headingFontSize = fS(
      isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4,
    );

    const bodyFontSize = fS(
      isTablet ? typo.t4 : isSmallPhone ? typo.t2 : typo.t3,
    );

    const borderRadius = rS(isTablet ? 10 : 6);

    return StyleSheet.create({
      panel: {
        width: "100%",
        backgroundColor: colors.sectionlistTable.panel_bg,
        borderRadius,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderBottomEndRadius: 0,
        borderBottomLeftRadius: 0,
        borderColor: colors.sectionlistTable.panel_border,
        overflow: "hidden",

        shadowColor: colors.sectionlistTable.shadow,
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.06,
        // shadowRadius: rS(4),
        // elevation: 2,
      },

      panelPrimary: {
        borderColor: colors.sectionlistTable.primary_border,
      },

      panelHeading: {
        paddingVertical: isTablet ? space.sm : space.xs,
        paddingHorizontal: horizontalPadding,
        backgroundColor: colors.sectionlistTable.heading_bg,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      },

      panelHeadingText: {
        color: colors.sectionlistTable.heading_text,
        fontSize: headingFontSize,
        fontFamily: platformFonts.bold,
        lineHeight: headingFontSize * 1.3,
      },

      thead: {
        backgroundColor: colors.sectionlistTable.table_head_bg,
        borderBottomWidth: 1,
        borderBottomColor: colors.sectionlistTable.table_head_border,
      },

      row: {
        flexDirection: "row",
        minHeight: isTablet ? sS(40) : isSmallPhone ? sS(30) : sS(34),
        alignItems: "center",
      },

      cell: {
        paddingHorizontal: horizontalPadding,
        paddingVertical: verticalPadding,
        justifyContent: "center",
      },

      thText: {
        fontSize: bodyFontSize,
        color: colors.sectionlistTable.header_text,
        fontFamily: platformFonts.bold,
        textTransform: "capitalize",
        lineHeight: bodyFontSize * 1.3,
      },

      tdText: {
        fontSize: bodyFontSize,
        color: colors.sectionlistTable.body_text,
        fontFamily: platformFonts.regular,
        lineHeight: bodyFontSize * 1.35,
      },

      evenRow: {
        backgroundColor: colors.sectionlistTable.even_row_bg,
      },

      prefixMismatch: {
        backgroundColor: colors.sectionlistTable.prefix_mismatch_bg,
      },

      emptyText: {
        paddingHorizontal: horizontalPadding,
        paddingVertical: isTablet ? space.md : space.sm,
        fontSize: headingFontSize,
        color: colors.sectionlistTable.empty_text,
        fontFamily: platformFonts.regular,
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomRightRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        borderColor: colors.sectionlistTable.primary_border,
        backgroundColor: colors.sectionlistTable.panel_bg,
      },

      linkText: {
        color: colors.sectionlistTable.link_text,
        textDecorationLine: "underline",
        textDecorationColor: colors.sectionlistTable.link_text,
        fontSize: bodyFontSize,
        fontFamily: platformFonts.regular,
      },

      anchorAction: {
        color: colors.sectionlistTable.anchor_action,
        fontSize: bodyFontSize,
        fontFamily: platformFonts.regular,
        marginLeft: space.xs,
      },

      anchorAZeroMargin: {
        marginLeft: 0,
      },

      inline: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
      },

      addIcon: {
        fontSize: fS(isTablet ? typo.t7 : isSmallPhone ? typo.t5 : typo.t6),
        color: colors.sectionlistTable.anchor_action,
        fontFamily: platformFonts.bold,
      },
    });
  }, [space, isSmallPhone, isTablet, fS, sS, rS]);
};
