import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function SidebarOverlay({ onPress }) {
  return (
    <Pressable
      style={styles.overlay}
      activeOpacity={1}
      onPress={onPress}
    >
      <View style={{ flex: 1 }} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 98,
  },
});
