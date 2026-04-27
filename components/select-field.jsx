import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { getSpacing } from "@/constants/spacing";
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
  const { isSmallPhone, isTablet, isLandscape, fS, sS, rS, htS } =
    useResponsive();

  const [focused, setFocused] = useState(false);

  const space = getSpacing({
    sS,
    isSmallPhone,
    isTablet,
    isLandscape,
  });

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
        colors,
        platformFonts,
        typo,
        space,
        width,
        disabled,
        focused,
        isSmallPhone,
        isTablet,
        fS,
        rS,
        htS,
      }),
    [space, width, disabled, focused, isSmallPhone, isTablet, fS, rS, htS],
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

const getStyles = ({
  colors,
  platformFonts,
  typo,
  space,
  width,
  disabled,
  focused,
  isSmallPhone,
  isTablet,
  fS,
  rS,
  htS,
}) => {
  return StyleSheet.create({
    container: {
      width,
      minWidth: isTablet ? 180 : 120,
      height: htS(isTablet ? 48 : isSmallPhone ? 38 : 42),
      justifyContent: "center",
      backgroundColor: colors.selectField.background,
      borderWidth: 1,
      borderColor: colors.selectField.border_clr,
      borderRadius: rS(isTablet ? 10 : 8),
      overflow: "hidden",

      shadowColor: colors.selectField.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: focused ? 0.12 : 0.05,
      shadowRadius: rS(3),
      elevation: focused ? 3 : 1,
    },

    containerFocused: {
      borderColor: colors.selectField.outline_clr,
      borderWidth: 1.5,
    },

    containerDisabled: {
      backgroundColor: colors.selectField.disabled_bg,
      borderColor: colors.selectField.disabled_border,
      opacity: 0.9,
    },

    picker: {
      width: "100%",
      color: colors.selectField.body_text,
      fontFamily: platformFonts.regular,
      fontSize: fS(isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4),
      paddingHorizontal: space.sm,
      marginLeft: isSmallPhone ? -6 : -2,
    },

    itemStyle: {
      fontFamily: platformFonts.regular,
      fontSize: fS(isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4),
    },

    disabledText: {
      color: colors.selectField.disabled_text,
    },
  });
};
