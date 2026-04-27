import ScreenWrap from "@/components/screen-wrap";
import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { StyleSheet, Text, View } from "react-native";

export default function BlockPhone() {
  return (
    <ScreenWrap pageTitle={"BlockPhone"}>
      <View style={styles.container}>
        <Text style={styles.text}>BlockPhone contents</Text>
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
