import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { menuData } from "@/constants/sidebar-menu";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function SidebarCont({ closeSidebar }) {
  const [openParent, setOpenParent] = useState(null);
  const router = useRouter();

  const { isSmallPhone, isTablet } = useResponsive();

  const styles = useMemo(
    () =>
      getStyles({
        isSmallPhone,
        isTablet,
      }),
    [isSmallPhone, isTablet],
  );

  const handleParentClick = (index, item) => {
    setOpenParent(openParent === index ? null : index);

    if (item.dual) {
      router.push(item.dual);

      setTimeout(() => {
        closeSidebar?.();
      }, 250);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {menuData.map((item, index) => {
          const isOpen = openParent === index;

          return (
            <View key={index} style={styles.parentContainer}>
              <Pressable
                onPress={() => handleParentClick(index, item)}
                style={({ pressed }) => [
                  styles.parentButton,
                  pressed && styles.parentButtonPressed,
                  isOpen && styles.parentButtonOpen,
                ]}
              >
                <View style={styles.parentLeft}>
                  <Ionicons
                    name={item.icon}
                    size={isTablet ? 22 : isSmallPhone ? 16 : 18}
                    color={colors.sidebarCont.icon}
                  />

                  <Text style={styles.parentText}>{item.title}</Text>
                </View>

                {item.children && (
                  <Ionicons
                    name={
                      isOpen ? "chevron-up-outline" : "chevron-down-outline"
                    }
                    size={isTablet ? 18 : isSmallPhone ? 14 : 16}
                    color={colors.sidebarCont.chevron}
                  />
                )}
              </Pressable>

              {isOpen && item.children && (
                <View style={styles.childContainer}>
                  {item.children.map((child, cIndex) => (
                    <Pressable
                      key={cIndex}
                      onPress={() => {
                        router.push(child.path);
                        closeSidebar?.();
                      }}
                      style={({ pressed }) => [
                        styles.childButton,
                        pressed && styles.childButtonPressed,
                      ]}
                    >
                      <Ionicons
                        name={child.icon}
                        size={isTablet ? 18 : isSmallPhone ? 13 : 15}
                        color={colors.sidebarCont.child_icon}
                      />

                      <Text style={styles.childText}>{child.title}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const getStyles = ({ isSmallPhone, isTablet }) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: colors.sidebarCont.background,
      paddingTop: isTablet ? spacing.md1 : spacing.sm3,
      paddingBottom: spacing.sm3,
    },

    scroll: {
      flexGrow: 1,
      paddingHorizontal: isTablet ? spacing.sm3 : spacing.sm2,
    },

    parentContainer: {
      marginBottom: spacing.sm1,
    },

    parentButton: {
      minHeight: isTablet ? 48 : isSmallPhone ? 44 : 46,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: isTablet ? spacing.sm3 : spacing.sm2,
      paddingVertical: isTablet ? spacing.sm1 : spacing.xs3,
      borderRadius: isTablet ? 12 : 10,
      backgroundColor: colors.sidebarCont.parent_bg,
      borderWidth: 1,
      borderColor: colors.sidebarCont.parent_border,

      shadowColor: colors.sidebarCont.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },

    parentButtonPressed: {
      backgroundColor: colors.sidebarCont.parent_pressed_bg,
      transform: [{ scale: 0.985 }],
    },

    parentButtonOpen: {
      borderColor: colors.sidebarCont.active_border,
      backgroundColor: colors.sidebarCont.active_bg,
    },

    parentLeft: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },

    parentText: {
      flexShrink: 1,
      marginLeft: spacing.xs3,
      color: colors.sidebarCont.parent_text,
      fontSize: isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5,
      lineHeight: isTablet ? typo.t7 : isSmallPhone ? typo.t5 : typo.t6,
      fontFamily: platformFonts.regular,
    },

    childContainer: {
      marginTop: spacing.xs3,
      marginLeft: isTablet ? spacing.md1 : spacing.sm3,
      paddingLeft: spacing.sm1,
      borderLeftWidth: 1,
      borderLeftColor: colors.sidebarCont.child_border,
    },

    childButton: {
      minHeight: isTablet ? 38 : isSmallPhone ? 34 : 36,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.sm2,
      paddingVertical: spacing.sm1,
      borderRadius: 8,
      marginBottom: spacing.xs2,
    },

    childButtonPressed: {
      backgroundColor: colors.sidebarCont.child_pressed_bg,
    },

    childText: {
      flexShrink: 1,
      marginLeft: spacing.xs3,
      color: colors.sidebarCont.child_text,
      fontSize: isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4,
      lineHeight: isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5,
      fontFamily: platformFonts.regular,
    },
  });
};
