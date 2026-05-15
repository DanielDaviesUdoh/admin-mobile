import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";

export const useAutocompleteFieldStyles = ({
  width = "100%",
  focused,
  disabled,
}) => {
  const { isSmallPhone, isTablet } = useResponsive();

  return useMemo(() => {
    const fontSize = isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4;

    const iconSize = isTablet ? 24 : 20;
    const clearIconSize = isTablet ? 22 : 18;

    return {
      inputHeight: isTablet ? 48 : 44,

      suggestionsListMaxHeight: isTablet ? 220 : isSmallPhone ? 180 : 200,

      containerStyle: {
        width,
      },

      inputContainerStyle: {
        minHeight: isTablet ? 48 : 44,
        backgroundColor: disabled
          ? colors.autocompleteField.global_disabled_bg_clr
          : colors.autocompleteField.global_white_clr,
        borderWidth: 1,
        borderColor: disabled
          ? colors.autocompleteField.select_border_disabled_clr
          : focused
            ? colors.autocompleteField.select_outline_clr
            : colors.autocompleteField.select_border_clr,
        borderRadius: isTablet ? 8 : 6,
      },

      textInputProps: {
        placeholderTextColor: colors.autocompleteField.plchd_clr,
        editable: !disabled,
        style: {
          width: "100%",
          fontFamily: platformFonts.regular,
          fontSize,
          color: disabled
            ? colors.autocompleteField.global_disabled_text_clr
            : colors.autocompleteField.body_text,
          backgroundColor: disabled
            ? colors.autocompleteField.global_disabled_bg_clr
            : colors.autocompleteField.global_white_clr,
          paddingBottom: spacing.xs1,
          paddingTop: spacing.xs1,
          paddingHorizontal: spacing.md1,
        },
      },

      renderItemContainer: {
        paddingVertical: spacing.xs2,
        paddingHorizontal: spacing.sm3,
      },

      renderItemText: {
        fontFamily: platformFonts.regular,
        fontSize,
        color: colors.autocompleteField.global_black_clr,
      },

      suggestionsListContainerStyle: {
        backgroundColor: colors.autocompleteField.global_white_clr,
        borderWidth: 1,
        borderColor: colors.autocompleteField.suggestions_border_clr,
        borderRadius: isTablet ? 8 : 6,
        marginTop: spacing.xs1,
      },

      suggestionsListTextStyle: {
        fontFamily: platformFonts.regular,
        fontSize,
        color: colors.autocompleteField.global_black_clr,
      },

      emptyText: {
        fontFamily: platformFonts.regular,
        fontSize: isTablet ? typo.t4 : isSmallPhone ? typo.t2 : typo.t3,
        color: colors.autocompleteField.error_text,
        paddingHorizontal: spacing.xs1,
        paddingVertical: spacing.xs2,
      },

      loadingText: {
        fontFamily: platformFonts.regular,
        fontSize: isTablet ? typo.t4 : isSmallPhone ? typo.t2 : typo.t3,
        color: colors.autocompleteField.global_black_clr,
        paddingHorizontal: spacing.xs1,
        paddingVertical: spacing.xs2,
      },

      chevronSize: iconSize,
      clearIconSize,
      iconColor: disabled
        ? colors.autocompleteField.global_disabled_text_clr
        : colors.autocompleteField.global_black_clr,
    };
  }, [width, focused, disabled, isSmallPhone, isTablet]);
};
