import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { getSpacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useFormStyles = () => {
  const { fS, sS, rS, isTablet, isSmallPhone, isLandscape } = useResponsive();

  const spacing = useMemo(
    () =>
      getSpacing({
        sS,
        isSmallPhone,
        isTablet,
        isLandscape,
      }),
    [sS, isSmallPhone, isTablet, isLandscape],
  );

  return useMemo(() => {
    const titleFontSize = isTablet
      ? fS(typo.t7)
      : isSmallPhone
        ? fS(typo.t5, 0.15)
        : fS(typo.t6);

    const labelFontSize = isTablet
      ? fS(typo.t5)
      : isSmallPhone
        ? fS(typo.t3, 0.15)
        : fS(typo.t4);

    const buttonFontSize = isTablet
      ? fS(typo.t5)
      : isSmallPhone
        ? fS(typo.t3, 0.15)
        : fS(typo.t4);

    const closeFontSize = isTablet
      ? fS(typo.t11)
      : isSmallPhone
        ? fS(typo.t9, 0.15)
        : fS(typo.t10);

    return StyleSheet.create({
      /* =======================
         Form Container
      ======================== */
      formCont: {
        width: "100%",
      },

      /* =======================
         Header
      ======================== */
      formHeader: {
        paddingVertical: isTablet ? spacing.lg : spacing.md,
        paddingHorizontal: isTablet ? spacing.lg : spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.formStyles.border_clr,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },

      title: {
        flex: 1,
        paddingRight: spacing.sm,
        fontSize: titleFontSize,
        lineHeight: titleFontSize * 1.25,
        fontFamily: platformFonts.medium,
        color: colors.formStyles.body_text,
        includeFontPadding: false, // Android
      },

      closeBtn: {
        fontSize: closeFontSize,
        lineHeight: closeFontSize,
        color: colors.formStyles.body_text,
        fontFamily: platformFonts.regular,
        includeFontPadding: false, // Android
      },

      /* =======================
         Body
      ======================== */
      formBody: {
        paddingTop: isTablet ? spacing.xl : spacing.lg,
        paddingBottom: spacing.lg,
        paddingLeft: isTablet ? spacing.lg : spacing.md,
        paddingRight: isLandscape ? spacing.sm : 0,
      },

      formGroup: {
        flexDirection: "column",
        rowGap: spacing.sm,
        marginBottom: spacing.md,
      },

      controlLabel: {
        fontSize: labelFontSize,
        lineHeight: labelFontSize * 1.3,
        fontFamily: platformFonts.bold,
        color: colors.formStyles.body_text,
        includeFontPadding: false, // Android
      },

      widthAdjust: {
        maxWidth: isTablet ? sS(110) : sS(80),
      },

      widthAdjustOne: {
        maxWidth: isTablet ? sS(100) : sS(75),
      },

      textfield: {
        width: isTablet ? (isLandscape ? "75%" : "85%") : "90%",
        maxWidth: isTablet ? sS(420) : sS(280),
      },

      addNumRouting: {
        flexDirection: isSmallPhone ? "column" : "row",
        alignItems: isSmallPhone ? "flex-start" : "center",
        columnGap: spacing.xs,
        rowGap: spacing.xs,
      },

      showPrefixGroup: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: isSmallPhone ? "wrap" : "nowrap",
      },

      prefixCentered: {
        flex: 1,
        textAlign: "center",
      },

      /* =======================
         Footer
      ======================== */
      formFooter: {
        paddingVertical: spacing.sm,
        paddingHorizontal: isTablet ? spacing.lg : spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.formStyles.border_clr,
        alignItems: isSmallPhone ? "stretch" : "flex-end",
      },

      submit: {
        minWidth: isTablet ? sS(120) : sS(96),
        borderRadius: rS(isTablet ? 8 : 6),
        paddingVertical: isTablet ? spacing.sm : spacing.xs,
        paddingHorizontal: isTablet ? spacing.lg : spacing.md,
        alignItems: "center",
        justifyContent: "center",
      },

      submitText: {
        color: colors.formStyles.global_white_clr,
        fontSize: buttonFontSize,
        lineHeight: buttonFontSize * 1.2,
        fontFamily: platformFonts.medium,
        textTransform: "capitalize",
        includeFontPadding: false, // Android
      },

      /* =======================
         Button Variants
      ======================== */
      post: {
        backgroundColor: colors.formStyles.green,
        borderWidth: 1,
        borderColor: colors.formStyles.green,
      },

      postOne: {
        backgroundColor: colors.formStyles.btn_bg,
        borderWidth: 1,
        borderColor: colors.formStyles.select_outline_clr,
      },

      delete: {
        backgroundColor: colors.formStyles.error_text_pressed,
        borderWidth: 1,
        borderColor: colors.formStyles.error_text_pressed,
      },

      disabled: {
        opacity: 0.6,
      },
    });
  }, [fS, sS, rS, spacing, isTablet, isSmallPhone, isLandscape]);
};
