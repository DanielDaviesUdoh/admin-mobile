import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  const translateY = useRef(new Animated.Value(-height)).current;

  useEffect(() => {
    if (open) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: -height,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={onCancel}
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onCancel}>
        {/* Prevent closing when clicking inside */}
        <Pressable>
          <Animated.View
            style={[styles.dialog, { transform: [{ translateY }] }]}
          >
            <View style={styles.content}>
              {title && <Text style={styles.title}>{title}</Text>}

              <Text style={styles.message}>{message}</Text>
            </View>

            <View style={styles.actions}>
              <Pressable
                onPress={onCancel}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={onConfirm}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.buttonText}>OK</Text>
              </Pressable>
            </View>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  dialog: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  content: {
    marginBottom: 16,
  },

  title: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 6,
  },

  message: {
    fontSize: 14,
    color: "#3c4043",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },

  button: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },

  buttonPressed: {
    backgroundColor: "rgba(26, 115, 232, 0.16)",
  },

  buttonText: {
    color: "#1a73e8",
    fontSize: 14,
    fontWeight: "500",
  },
});
