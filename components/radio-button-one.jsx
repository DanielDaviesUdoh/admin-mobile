import { colors } from "@/constants/colors";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";

export default function CRadioButtonOne({
  status,
  onPress,
  scale = 1,
  value = "",
}) {
  return (
    <View style={{ transform: [{ scale: scale }] }}>
      <RadioButton
        value={value}
        status={status ? "checked" : "unchecked"}
        onPress={onPress}
        color={status ? colors.cCheckbox.checked_clr : undefined}
        uncheckedColor={colors.cCheckbox.unchecked_clr}
      />
    </View>
  );
}
