import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import React from "react";
import { StyleSheet } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.successContainer}
      contentContainerStyle={styles.content}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={styles.errorContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  successContainer: {
    borderLeftColor: colors.green,
    backgroundColor: colors.btn_text,
  },
  errorContainer: {
    borderLeftColor: colors.error_text,
  },
  content: {
    paddingHorizontal: 15,
  },
  text1: {
    fontFamily: platformFonts.regular,
    fontSize: 14,
  },
  text2: {
    fontFamily: platformFonts.regular,
    fontSize: 12,
    marginTop: 4,
  },
});
