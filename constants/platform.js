import { Platform } from "react-native";
import { fonts } from "./fonts";

export const platformFonts = {
  regular: Platform.select({
    ios: fonts.regular,
    android: fonts.regular,
    default: "serif",
  }),
  medium: Platform.select({
    ios: fonts.medium,
    android: fonts.medium,
    default: "serif",
  }),
  bold: Platform.select({
    ios: fonts.bold,
    android: fonts.bold,
    default: "serif",
  }),
};
