import { spacing } from "@/constants/spacing";
import { useResponsive } from "@/hooks/useResponsive";
import { countriesNavObject } from "@/screens/routing-screens/countries/constants/countriesNavObject";
import React from "react";
import { StyleSheet, View } from "react-native";

import Links from "./Links";

const selectNavObject = (navObject) => {
  if (navObject === "countries") return countriesNavObject;
  // if (navObject === "clients") return clientNavObject;

  return [];
};

const RouteLinks = ({ navObject, sParamsName, sParams }) => {
  const data = selectNavObject(navObject);

  const { isSmallPhone, isTablet, isLandscape } = useResponsive();

  const styles = getStyles({
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

const getStyles = ({ isSmallPhone, isTablet, isLandscape }) =>
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

      marginTop: spacing.xs3,

      paddingHorizontal: isSmallPhone
        ? spacing.xs1
        : isTablet
          ? spacing.sm3
          : spacing.sm1,

      paddingVertical: isTablet
        ? spacing.sm2
        : isLandscape
          ? spacing.xs2
          : spacing.sm1,

      rowGap: isTablet ? spacing.sm1 : isLandscape ? spacing.xs2 : spacing.xs3,

      columnGap: isTablet
        ? spacing.sm1
        : isLandscape
          ? spacing.xs1
          : spacing.xs2,
    },
  });
