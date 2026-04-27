import ScreenWrap from "@/components/screen-wrap";
import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { StyleSheet, Text, View } from "react-native";

export default function PhoneQuery() {
  return (
    <ScreenWrap pageTitle={"PhoneQuery"}>
      <View style={styles.container}>
        <Text style={styles.text}>PhoneQuery contents</Text>
      </View>
    </ScreenWrap>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  text: {
    color: colors.body_text,
    fontSize: 16,
    fontFamily: platformFonts.regular,
  },
});
