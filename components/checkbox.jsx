// CCheckbox.jsx
import { colors } from "@/constants/colors";
import { useCCheckboxStyles } from "@/styles/cCheckboxStyles";
import React from "react";
import { Text, View } from "react-native";
import { Checkbox } from "react-native-paper";

export default function CCheckbox({
  status,
  onPress,
  text = null,
  textStyle = {},
  scale = 1,
  checkboxContStyle = {},
}) {
  const styles = useCCheckboxStyles({
    hasText: !!text,
    scale,
    textStyle,
    checkboxContStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.checkboxWrapper}>
        <Checkbox
          status={status ? "checked" : "unchecked"}
          onPress={onPress}
          uncheckedColor={colors.cCheckbox.unchecked_clr}
          color={status ? colors.cCheckbox.checked_clr : undefined}
        />
      </View>

      {text ? <Text style={styles.text}>{text}</Text> : null}
    </View>
  );
}
