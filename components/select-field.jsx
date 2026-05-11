import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function SelectField({
  width = "100%",
  selected,
  setSelected,
  mapOption,
  activeRadioBtn,
  handleFocus,
  disabled = false,
}) {
  const { isSmallPhone, isTablet } = useResponsive();

  const [focused, setFocused] = useState(false);

  const handleChildFocus = () => {
    if (disabled) return;
    setFocused(true);
  };

  const onFocus = handleFocus
    ? () => handleFocus(activeRadioBtn, setFocused, disabled)
    : handleChildFocus;

  const onBlur = () => {
    if (!disabled) {
      setFocused(false);
    }
  };

  const styles = useMemo(
    () =>
      getStyles({
        width,
        focused,
        isSmallPhone,
        isTablet,
      }),
    [width, focused, isSmallPhone, isTablet],
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
        enabled={!disabled}
        selectedValue={selected}
        onValueChange={(itemVal) => setSelected(itemVal)}
        mode="dropdown"
        onFocus={onFocus}
        onBlur={onBlur}
        dropdownIconColor={
          disabled
            ? colors.selectField.disabled_text
            : focused
              ? colors.selectField.outline_clr
              : colors.selectField.body_text
        }
        style={[styles.picker, disabled && styles.disabledText]}
        itemStyle={styles.itemStyle}
      >
        {Array.isArray(mapOption) && mapOption.length > 0 ? (
          mapOption
        ) : (
          <Picker.Item
            label="Nothing to select"
            value=""
            color={colors.selectField.placeholder}
          />
        )}
      </Picker>
    </View>
  );
}

const getStyles = ({ width, focused, isSmallPhone, isTablet }) => {
  const inputHeight = isTablet ? 48 : 44;

  const fontSize = isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4;

  const borderRadius = isTablet ? 8 : 6;

  return StyleSheet.create({
    container: {
      width,
      height: inputHeight,
      justifyContent: "center",
      backgroundColor: colors.selectField.background,
      borderWidth: 1,
      borderColor: colors.selectField.border_clr,
      borderRadius: borderRadius,
      overflow: "hidden",

      shadowColor: colors.selectField.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: focused ? 0.12 : 0.05,
      shadowRadius: 3,
      elevation: focused ? 3 : 1,
    },

    containerFocused: {
      borderColor: colors.selectField.outline_clr,
      borderWidth: 1,
    },

    containerDisabled: {
      backgroundColor: colors.selectField.disabled_bg,
      borderColor: colors.selectField.disabled_border,
      opacity: 0.85,
    },

    picker: {
      width: "100%",
      color: colors.selectField.body_text,
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
      color: colors.selectField.placeholder,
    },

    disabledText: {
      color: colors.selectField.disabled_text,
    },
  });
};
