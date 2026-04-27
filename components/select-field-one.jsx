import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function SelectFieldOne({
  width = "100%",
  selected,
  setSelected,
  children,
  item,
  disabled = false,
}) {
  const { isSmallPhone, isTablet } = useResponsive();

  const [focused, setFocused] = useState(false);

  const styles = useMemo(
    () =>
      getStyles({
        width,
        focused,
        item,
        isSmallPhone,
        isTablet,
      }),
    [width, focused, item, isSmallPhone, isTablet],
  );

  return (
    <View
      style={[
        styles.container,
        focused && !disabled && styles.containerFocused,
        disabled && styles.containerDisabled,
      ]}
    >
      <Picker
        selectedValue={selected}
        onValueChange={(itemVal) => setSelected(itemVal)}
        enabled={!disabled}
        mode="dropdown"
        dropdownIconColor={
          disabled
            ? colors.selectFieldOne.disabled_text
            : focused
              ? colors.selectFieldOne.outline_clr
              : colors.selectFieldOne.body_text
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.picker,
          !item && styles.placeholderText,
          disabled && styles.disabledText,
        ]}
        itemStyle={styles.itemStyle}
      >
        {children}
      </Picker>
    </View>
  );
}

const getStyles = ({ width, focused, item, isSmallPhone, isTablet }) => {
  const inputHeight = isTablet ? 48 : 44;

  const fontSize = isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4;

  const borderRadius = isTablet ? 8 : 6;

  return StyleSheet.create({
    container: {
      width,
      height: inputHeight,
      justifyContent: "center",
      backgroundColor: colors.selectFieldOne.background,
      borderWidth: 1,
      borderColor: colors.selectFieldOne.border_clr,
      borderRadius: borderRadius,
      overflow: "hidden",

      shadowColor: colors.selectFieldOne.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: focused ? 0.12 : 0.05,
      shadowRadius: 3,
      elevation: focused ? 3 : 1,
    },

    containerFocused: {
      borderColor: colors.selectFieldOne.outline_clr,
      borderWidth: 1,
    },

    containerDisabled: {
      backgroundColor: colors.selectFieldOne.disabled_bg,
      borderColor: colors.selectFieldOne.disabled_border,
      opacity: 0.85,
    },

    picker: {
      width: "100%",
      color: item
        ? colors.selectFieldOne.body_text
        : colors.selectFieldOne.placeholder,
      fontFamily: platformFonts.regular,
      fontSize: isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4,
      paddingHorizontal: spacing.sm3,
      marginLeft: isSmallPhone ? -6 : -2,
    },

    itemStyle: {
      fontFamily: platformFonts.regular,
      fontSize: fontSize,
    },

    placeholderText: {
      color: colors.selectFieldOne.placeholder,
    },

    disabledText: {
      color: colors.selectFieldOne.disabled_text,
    },
  });
};
