import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

import { colors } from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useLogout";
import { useResponsive } from "@/hooks/useResponsive";
import useStaff from "@/hooks/useStaff";
import { changeLanguage } from "@/i18n/changeLanguage";
import { useAppHeaderStyles } from "@/styles/appHeaderStyles";

import HeaderMenu from "./app-headerMenu";

export default function AppHeader({ toggleSidebar }) {
  const { auth, hasShownLoginToast, setHasShownLoginToast } = useAuth();
  const { staff } = useStaff();
  const { redirect } = useLocalSearchParams();

  const { i18n } = useTranslation();

  const authorized = auth?.auth;
  const staffFirstName = staff?.firstname;

  const styles = useAppHeaderStyles();
  const { isTablet, isSmallPhone } = useResponsive();

  const [menuVisible, setMenuVisible] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    if (authorized && !redirect && !hasShownLoginToast) {
      Toast.show({
        type: "success",
        position: "top",
        text1: `Welcome ${staffFirstName ?? ""}`,
        text2: "You have successfully logged in",
        visibilityTime: 3000,
      });

      setHasShownLoginToast(true);
    }
  }, [
    authorized,
    redirect,
    staffFirstName,
    hasShownLoginToast,
    setHasShownLoginToast,
  ]);

  const handleLogout = useLogout();

  const handleLanguageChange = async (lang) => {
    setLanguage(lang);
    await changeLanguage(lang);
  };

  return (
    <>
      <View style={styles.headerCont}>
        <View style={styles.menuLogo}>
          {authorized && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open menu"
              onPress={toggleSidebar}
              style={({ pressed }) => [
                styles.menuButton,
                pressed && {
                  backgroundColor: colors.aHeaderStyles.pressed_bg_clr,
                },
              ]}
            >
              <Ionicons
                name="menu"
                size={isTablet ? 32 : isSmallPhone ? 24 : 28}
                color={colors.aHeaderStyles.body_text}
              />
            </Pressable>
          )}

          <View style={styles.logoCont}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={styles.logoText}
            >
              Company&apos;s Name
            </Text>
          </View>
        </View>

        <View style={styles.userAction}>
          {authorized && (
            <View style={styles.userInfo}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.user}>
                User: {staffFirstName}
              </Text>

              <Pressable onPress={handleLogout}>
                {({ pressed }) => (
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.action,
                      {
                        color: pressed
                          ? colors.appHeader.logout_pressed_text
                          : colors.aHeaderStyles.global_white_clr,
                      },
                    ]}
                  >
                    Log out
                  </Text>
                )}
              </Pressable>
            </View>
          )}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="More options"
            onPress={() => setMenuVisible((prev) => !prev)}
            style={({ pressed }) => [
              styles.moreButton,
              pressed && {
                backgroundColor: colors.aHeaderStyles.pressed_bg_clr,
              },
            ]}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={isTablet ? 20 : isSmallPhone ? 12 : 16}
              color={colors.aHeaderStyles.global_white_clr}
            />
          </Pressable>
        </View>
      </View>

      <HeaderMenu
        visible={menuVisible}
        language={language}
        onLanguageChange={handleLanguageChange}
        onClose={() => setMenuVisible(false)}
      />
    </>
  );
}
