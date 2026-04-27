import { colors } from "@/constants/colors";
import { View } from "react-native";
import { Checkbox } from "react-native-paper";

export default function CCheckbox1({ status, onPress, scale = 1 }) {
  return (
    <View style={{ transform: [{ scale: scale }] }}>
      <Checkbox
        status={status ? "checked" : "unchecked"}
        onPress={onPress}
        uncheckedColor={colors.cCheckbox.unchecked_clr}
        color={status ? colors.cCheckbox.checked_clr : undefined}
      />
    </View>
  );
}
