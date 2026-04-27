import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";

export const useCCheckboxStyles = ({
  hasText,
  scale,
  textStyle = {},
  checkboxContStyle = {},
}) => {
  const { isSmallPhone, isTablet } = useResponsive();

  return useMemo(() => {
    const labelFontSize = isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4;
    const checkboxScale = scale * (isTablet ? 1.05 : isSmallPhone ? 0.95 : 1);

    return {
      container: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: hasText ? spacing.xs2 : 0,
        paddingVertical: spacing.xs1,
        ...checkboxContStyle,
      },

      checkboxWrapper: {
        justifyContent: "center",
        alignItems: "center",
        minWidth: isTablet ? 36 : 30,
        minHeight: isTablet ? 36 : 30,
        transform: [{ scale: checkboxScale }],
      },

      text: {
        flexShrink: 1,
        color: colors.cCheckbox.body_text,
        fontFamily: platformFonts.regular,
        fontSize: labelFontSize,
        lineHeight: Math.round(labelFontSize * 1.35),
        ...textStyle,
      },
    };
  }, [hasText, scale, textStyle, checkboxContStyle, isSmallPhone, isTablet]);
};
