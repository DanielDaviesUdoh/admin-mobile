import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useOutletWrapStyles = () => {
  return useMemo(() => {
    return StyleSheet.create({
      outletCont: {
        flex: 1,
        minWidth: 0,
      },
    });
  }, []);
};
