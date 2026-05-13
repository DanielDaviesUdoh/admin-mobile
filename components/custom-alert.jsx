import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CustomAlert({
  visible,
  title,
  message,
  buttons = [{ text: "OK", onPress: () => {} }],
  onClose,
}) {
  const { isSmallPhone, isTablet, isLandscape, vS } = useResponsive();

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: vS(40),
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, opacity, translateY, vS]);

  const styles = useMemo(() => {
    const maxWidth = isTablet
      ? isLandscape
        ? 520
        : 460
      : isLandscape
        ? 500
        : 380;

    return StyleSheet.create({
      overlay: {
        flex: 1,
        backgroundColor: colors.customAlert.overlay_bg,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.lg1,
        paddingVertical: spacing.lg3,
      },

      container: {
        width: "100%",
        maxWidth,
        backgroundColor: colors.customAlert.background,
        borderRadius: isTablet ? 18 : 14,
        paddingHorizontal: spacing.lg1,
        paddingVertical: spacing.lg1,
        shadowColor: colors.customAlert.shadow,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 8,
      },

      contentWrap: {
        width: "100%",
      },

      title: {
        fontSize: isTablet ? typo.t9 : isSmallPhone ? typo.t6 : typo.t7,
        lineHeight: isTablet ? typo.t10 : isSmallPhone ? typo.t7 : typo.t8,
        fontFamily: platformFonts.bold,
        color: colors.customAlert.title_text,
        marginBottom: spacing.sm3,
      },

      message: {
        fontSize: isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5,
        lineHeight: isTablet ? typo.t8 : isSmallPhone ? typo.t6 : typo.t7,
        fontFamily: platformFonts.regular,
        color: colors.customAlert.message_text,
        marginBottom: spacing.lg1,
      },

      buttonRow: {
        flexDirection: isSmallPhone && buttons.length > 1 ? "column" : "row",
        justifyContent: "flex-end",
        alignItems: "stretch",
        gap: spacing.sm3,
      },

      button: {
        minWidth: isSmallPhone ? "100%" : isTablet ? 110 : 90,
        paddingVertical: spacing.sm2,
        paddingHorizontal: spacing.md2,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.customAlert.button_bg,
      },

      buttonPressed: {
        backgroundColor: colors.customAlert.button_pressed_bg,
      },

      buttonText: {
        color: colors.customAlert.button_text,
        fontSize: isTablet ? typo.t5 : isSmallPhone ? typo.t4 : typo.t5,
        fontFamily: platformFonts.medium,
      },
    });
  }, [buttons.length, isLandscape, isSmallPhone, isTablet]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity,
              transform: [{ translateY }],
            },
          ]}
          pointerEvents="box-none"
        >
          <Pressable onPress={() => {}} style={styles.contentWrap}>
            {!!title && <Text style={styles.title}>{title}</Text>}

            {!!message && <Text style={styles.message}>{message}</Text>}

            <View style={styles.buttonRow}>
              {buttons.map((btn, index) => (
                <Pressable
                  key={`${btn.text}-${index}`}
                  onPress={() => {
                    btn.onPress?.();
                    onClose?.();
                  }}
                  style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.buttonText}>{btn.text}</Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
