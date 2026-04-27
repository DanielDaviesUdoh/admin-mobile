import { useInputFieldOneStyles } from "@/styles/inputFieldOneStyles";
import { TextInput } from "react-native-paper";

export default function InputSFieldOne({
  width="100%",
  value,
  style={},
  outlineStyle={}
}) {
  const styles = useInputFieldOneStyles();

  return (
    <TextInput
      mode="outlined"
      editable={false}
      style={[styles.styleS, {width}, style]}
      outlineStyle={[styles.outlineStyle, outlineStyle]}
      contentStyle={styles.contentStyle}
      theme={styles.themeS}
      value={value}
    />
  );
}
