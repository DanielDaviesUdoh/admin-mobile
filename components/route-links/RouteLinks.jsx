import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { getSpacing } from "@/constants/spacing";
import { useResponsive } from "@/hooks/useResponsive";
import { countriesNavObject } from "@/screens/routing-screens/countries/constants/countriesNavObject";

import Links from "./Links";

const selectNavObject = (navObject) => {
  if (navObject === "countries") return countriesNavObject;
  // if (navObject === "clients") return clientNavObject;

  return [];
};

const RouteLinks = ({ navObject, sParamsName, sParams }) => {
  const data = selectNavObject(navObject);

  const { sS, rS, isSmallPhone, isTablet, isLandscape } = useResponsive();

  const spacing = getSpacing({
    sS,
    isSmallPhone,
    isTablet,
    isLandscape,
  });

  const styles = getStyles({
    spacing,
    rS,
    isSmallPhone,
    isTablet,
    isLandscape,
  });

  return (
    <View style={styles.container}>
      {data?.map((obj, index) => (
        <Links
          key={index}
          sParamsName={sParamsName}
          sParams={sParams}
          {...obj}
        />
      ))}
    </View>
  );
};

export default RouteLinks;

const getStyles = ({ spacing, rS, isSmallPhone, isTablet, isLandscape }) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",

      alignItems: isTablet ? "flex-start" : "center",
      justifyContent: isTablet
        ? "flex-start"
        : isLandscape
          ? "flex-start"
          : "flex-start",

      marginVertical: spacing.xxs,

      paddingHorizontal: isSmallPhone
        ? spacing.xxxs
        : isTablet
          ? spacing.md
          : spacing.xs,

      paddingVertical: isTablet
        ? spacing.sm
        : isLandscape
          ? spacing.xs
          : spacing.xxxs,

      rowGap: isTablet ? spacing.sm : isLandscape ? spacing.xs : spacing.xxs,

      columnGap: isTablet ? spacing.sm : isLandscape ? spacing.xs : spacing.xxs,

      backgroundColor: colors.routeLinks.offWhite,

      borderRadius: rS(isTablet ? 12 : isLandscape ? 8 : 6),

      borderWidth: 1,
      borderColor: colors.routeLinks.border_clr,

      width: "100%",
      alignSelf: "stretch",
    },
  });
