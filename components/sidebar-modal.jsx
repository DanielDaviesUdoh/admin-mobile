import React, { useMemo } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { useResponsive } from "@/hooks/useResponsive";

import SidebarCont from "./sidebar-cont";
import SidebarOverlay from "./sidebar-overlay";

export default function SidebarModal(props) {
  const { isVisible, closeSidebar, sidebarWidth, sidebarTranslateX } = props;

  const { width, isSmallPhone, isTablet, isLandscape } = useResponsive();

  const resolvedSidebarWidth =
    sidebarWidth ||
    (isTablet
      ? Math.min(width * (isLandscape ? 0.42 : 0.5), 420)
      : Math.min(width * (isSmallPhone ? 0.88 : 0.82), 340));

  const styles = useMemo(
    () =>
      getStyles({
        colors,
        isTablet,
        resolvedSidebarWidth,
      }),
    [isTablet, resolvedSidebarWidth],
  );

  if (!isVisible) return null;

  return (
    <View style={styles.modalContainer}>
      <SidebarOverlay onPress={closeSidebar} />

      <Animated.View
        style={[
          styles.sidebarContainer,
          {
            width: resolvedSidebarWidth,
            transform: [{ translateX: sidebarTranslateX }],
          },
        ]}
      >
        <SidebarCont closeSidebar={closeSidebar} />
      </Animated.View>
    </View>
  );
}

const getStyles = ({ colors, isTablet, resolvedSidebarWidth }) => {
  return StyleSheet.create({
    modalContainer: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 100,
      elevation: 100,
      justifyContent: "flex-start",
    },

    sidebarContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      width: resolvedSidebarWidth,
      backgroundColor: colors.sidebarModal.background,
      borderTopRightRadius: isTablet ? 10 : 8,
      borderBottomRightRadius: isTablet ? 10 : 8,
      overflow: "hidden",
      zIndex: 101,

      ...Platform.select({
        ios: {
          shadowColor: colors.sidebarModal.shadow,
          shadowOpacity: 0.16,
          shadowRadius: 8,
          shadowOffset: {
            width: 2,
            height: 0,
          },
        },

        android: {
          elevation: 12,
        },

        web: {
          boxShadow: `2px 0px 14px ${colors.sidebarModal.web_shadow}`,
        },
      }),
    },
  });
};
