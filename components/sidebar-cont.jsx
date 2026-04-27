import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { platformFonts } from "@/constants/platform";
import { menuData } from "@/constants/sidebar-menu";
import { getSpacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

export default function SidebarCont({ closeSidebar }) {
  const [openParent, setOpenParent] = useState(null);
  const router = useRouter();

  const { isSmallPhone, isTablet, isLandscape, fS, sS, rS, iS } =
    useResponsive();

  const space = getSpacing({
    sS,
    isSmallPhone,
    isTablet,
    isLandscape,
  });

  const styles = useMemo(
    () =>
      getStyles({
        colors,
        platformFonts,
        typo,
        space,
        isSmallPhone,
        isTablet,
        isLandscape,
        fS,
        rS,
        iS,
      }),
    [space, isSmallPhone, isTablet, isLandscape, fS, rS, iS],
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
                    size={isTablet ? iS(22) : isSmallPhone ? iS(16) : iS(18)}
                    color={colors.sidebarCont.icon}
                  />

                  <Text style={styles.parentText}>{item.title}</Text>
                </View>

                {item.children && (
                  <Ionicons
                    name={
                      isOpen ? "chevron-up-outline" : "chevron-down-outline"
                    }
                    size={isTablet ? iS(18) : isSmallPhone ? iS(14) : iS(16)}
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
                        size={
                          isTablet ? iS(18) : isSmallPhone ? iS(13) : iS(15)
                        }
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

const getStyles = ({
  colors,
  platformFonts,
  typo,
  space,
  isSmallPhone,
  isTablet,
  isLandscape,
  fS,
  rS,
}) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: colors.sidebarCont.background,
      paddingTop: isTablet ? space.md : space.sm,
      paddingBottom: space.sm,
    },

    scroll: {
      flexGrow: 1,
      paddingHorizontal: isTablet ? space.md : space.sm,
    },

    parentContainer: {
      marginBottom: space.xs,
    },

    parentButton: {
      minHeight: isTablet ? 54 : isSmallPhone ? 44 : 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: isTablet ? space.md : space.sm,
      paddingVertical: isTablet ? space.sm : space.xs,
      borderRadius: rS(isTablet ? 12 : 10),
      backgroundColor: colors.sidebarCont.parent_bg,
      borderWidth: 1,
      borderColor: colors.sidebarCont.parent_border,

      shadowColor: colors.sidebarCont.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: rS(2),
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
      marginLeft: space.xs,
      color: colors.sidebarCont.parent_text,
      fontSize: fS(isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5),
      lineHeight: fS(isTablet ? typo.t7 : isSmallPhone ? typo.t5 : typo.t6),
      fontFamily: platformFonts.regular,
    },

    childContainer: {
      marginTop: space.xs,
      marginLeft: isTablet ? space.lg : space.md,
      paddingLeft: space.sm,
      borderLeftWidth: 1,
      borderLeftColor: colors.sidebarCont.child_border,
    },

    childButton: {
      minHeight: isTablet ? 46 : isSmallPhone ? 38 : 42,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: space.sm,
      paddingVertical: space.xs,
      borderRadius: rS(8),
      marginBottom: space.xxs,
    },

    childButtonPressed: {
      backgroundColor: colors.sidebarCont.child_pressed_bg,
    },

    childText: {
      flexShrink: 1,
      marginLeft: space.xs,
      color: colors.sidebarCont.child_text,
      fontSize: fS(isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4),
      lineHeight: fS(isTablet ? typo.t6 : isSmallPhone ? typo.t4 : typo.t5),
      fontFamily: platformFonts.regular,
    },
  });
};
