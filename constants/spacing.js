export const spacing = {
  xs1: 2,
  xs2: 4,
  xs3: 6,
  sm1: 8,
  sm2: 10,
  sm3: 12,
  md1: 14,
  md2: 16,
  md3: 18,
  lg1: 20,
  lg2: 24,
  lg3: 28,
  xl1: 32,
  xl2: 36,
  xl3: 40,
};

export const getSpacing = ({ sS, isSmallPhone, isTablet, isLandscape }) => ({
  xxxs: sS(isSmallPhone ? spacing.xs1 : spacing.xs2),

  xxs: sS(isTablet ? spacing.sm1 : isSmallPhone ? spacing.xs2 : spacing.xs3),

  xs: sS(isTablet ? spacing.sm2 : isSmallPhone ? spacing.xs3 : spacing.sm1),

  sm: sS(isTablet ? spacing.sm3 : isSmallPhone ? spacing.sm1 : spacing.sm2),

  md: sS(isTablet ? spacing.md2 : isLandscape ? spacing.md1 : spacing.sm3),

  lg: sS(isTablet ? spacing.lg2 : isLandscape ? spacing.lg1 : spacing.md2),

  xl: sS(isTablet ? spacing.xl1 : isLandscape ? spacing.lg3 : spacing.lg2),
});
