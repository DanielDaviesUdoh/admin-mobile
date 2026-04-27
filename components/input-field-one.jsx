import { useInputFieldOneStyles } from "@/styles/inputFieldOneStyles";
import { TextInput } from "react-native-paper";

export default function InputFieldOne({
  width = "100%",
  ariaLabel="",
  placeholder = "",
  value,
  onChangeText,
  secureTextEntry = false,
  handleFocus = null,
  activeRadioBtn,
  maxLength = undefined,
  style={},
  outlineStyle = {},
}) {
  const styles = useInputFieldOneStyles();
  const handleFocusWrapper = handleFocus
    ? () => handleFocus(activeRadioBtn)
    : undefined;

  return (
    <TextInput
      mode="outlined"
      style={[styles.style, { width }, style]}
      outlineStyle={[styles.outlineStyle, outlineStyle]}
      contentStyle={styles.contentStyle}
      theme={styles.theme}
      aria-label={ariaLabel}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      onFocus={handleFocusWrapper}
      onChangeText={onChangeText}
      autoCapitalize="none"
      autoComplete="off"
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#999"
      cursorColor="#666"
    />
  );
}
