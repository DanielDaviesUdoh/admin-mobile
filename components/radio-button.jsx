import { colors } from "@/constants/colors";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

export default function CRadioButton({
  status,
  onPress,
  style = {},
  textStyle = {},
  scale = 1,
  text = null,
  value = "",
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        columnGap: 4,
        alignItems: "center",
        justifyContent: "flex-start",
        ...style,
      }}
    >
      <View style={{ transform: [{ scale: scale }] }}>
        <RadioButton
          value={value}
          status={status ? "checked" : "unchecked"}
          onPress={onPress}
          color={status ? colors.cCheckbox.checked_clr : undefined}
          uncheckedColor={colors.cCheckbox.unchecked_clr}
        />
      </View>
      {text && <Text style={textStyle}>{text}</Text>}
    </View>
  );
}
