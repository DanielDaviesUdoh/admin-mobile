import { useAppFooterStyles } from "@/styles/appFooterStyles";
import React from "react";
import { Text, View } from "react-native";

export default function AppFooter() {
  const styles = useAppFooterStyles();
  const year = new Date().getFullYear();
  return (
    <View style={styles.footerCont}>
      <Text style={styles.footerText}>&copy; {year} - ABC Company Ltd</Text>
    </View>
  );
}
