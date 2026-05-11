import { useResponsive } from "@/hooks/useResponsive";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useSubScreenStyles = () => {
  const { isTablet, isSmallPhone } = useResponsive();

  return useMemo(() => {
    return StyleSheet.create({
      cont: { flex: 1 },
      textfieldCont: {
        width: isTablet ? 340 : isSmallPhone ? undefined : 280,
      },
      tableCont: {
        flex: 1,
        minHeight: 0,
      },
    });
  }, [isTablet, isSmallPhone]);
};
