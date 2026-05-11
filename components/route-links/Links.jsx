import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

const Links = ({ allPath, path, sParamsName, sParams, title }) => {
  const router = useRouter();

  const { isSmallPhone, isTablet, isLandscape } = useResponsive();

  const styles = getStyles({
    isSmallPhone,
    isTablet,
    isLandscape,
  });

  const handlePress = () => {
    const url = allPath
      ? allPath
      : {
          pathname: path,
          params: {
            [sParamsName]: sParams,
          },
        };

    router.push(url);
  };

  return (
    <Pressable
      onPress={handlePress}
      android_ripple={{
        color: colors.links.pressed_bg_clr,
        borderless: false,
      }}
      hitSlop={spacing.xxs}
      style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
    >
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
        style={styles.linkText}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Links;

function getStyles({ isSmallPhone, isTablet, isLandscape }) {
  return StyleSheet.create({
    link: {
      minHeight: isTablet ? 34 : isSmallPhone ? 26 : 30,
      minWidth: isTablet ? 80 : isLandscape ? 70 : 60,
      paddingVertical: spacing.xs3,
      paddingHorizontal: spacing.xs3,

      backgroundColor: colors.links.global_white_clr,
      borderWidth: 1,
      borderColor: colors.links.input_border_clr,

      marginLeft: isSmallPhone ? 0 : -1,
      marginBottom: spacing.xxs,

      justifyContent: "center",
      alignItems: "center",

      borderRadius: isTablet ? 10 : isLandscape ? 8 : isSmallPhone ? 5 : 6,

      maxWidth: isTablet
        ? "48%"
        : isLandscape
          ? "45%"
          : isSmallPhone
            ? "100%"
            : "auto",
    },

    linkText: {
      textTransform: "capitalize",
      textAlign: "center",
      color: colors.links.select_outline_clr,

      fontSize: isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4,
    },

    linkPressed: {
      backgroundColor: colors.links.pressed_bg_clr,
      borderColor: colors.links.select_outline_clr,
    },
  });
}
