import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import MuiSelectField from "./mui-select-field";

export default function HeaderMenu({
  visible,
  language,
  onLanguageChange,
  onClose,
}) {
  const [shouldRender, setShouldRender] = useState(visible);

  const progress = useRef(new Animated.Value(0)).current;
  const currentAnimation = useRef(null);

  useEffect(() => {
    currentAnimation.current?.stop();

    if (visible) {
      setShouldRender(true);

      currentAnimation.current = Animated.timing(progress, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      });

      currentAnimation.current.start(() => {
        currentAnimation.current = null;
      });
    } else if (shouldRender) {
      currentAnimation.current = Animated.timing(progress, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      });

      currentAnimation.current.start(({ finished }) => {
        currentAnimation.current = null;

        if (finished) {
          setShouldRender(false);
        }
      });
    }

    return () => {
      currentAnimation.current?.stop();
    };
  }, [visible, progress, shouldRender]);

  if (!shouldRender) {
    return null;
  }

  /**
   * Derived animations
   */

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-25, 0],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });

  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <Animated.View
        style={[
          styles.menu,
          {
            opacity,
            transform: [
              {
                translateY,
              },
              {
                scale,
              },
            ],
          },
        ]}
      >
        {/* Prevent closing when touching inside menu */}
        <Pressable onPress={() => {}}>
          <View>
            <Text style={styles.title}>Language</Text>

            <MuiSelectField selected={language} setSelected={onLanguageChange}>
              <Picker.Item label="English" value="en" />

              <Picker.Item label="Français" value="fr" />

              <Picker.Item label="Português" value="pt" />
            </MuiSelectField>
          </View>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },

  menu: {
    position: "absolute",

    right: 10,
    top: 65,

    width: 220,

    padding: 14,

    borderRadius: 10,

    backgroundColor: "#fff",

    elevation: 8,

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: colors.selectField.body_text,
  },
});
