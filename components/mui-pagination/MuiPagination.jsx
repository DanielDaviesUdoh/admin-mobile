import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { getSpacing } from "@/constants/spacing";
import { typo } from "@/constants/typo";
import { useResponsive } from "@/hooks/useResponsive";

const MuiPagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  startIndex,
  endIndex,
  setCurrentPage,
  setItemsPerPage,
  options = [20, 50, 100],
}) => {
  const { isSmallPhone, isTablet, isLandscape, fS, sS, rS, iS } =
    useResponsive();

  const space = getSpacing({
    sS,
    isSmallPhone,
    isTablet,
    isLandscape,
  });

  const styles = getStyles({
    colors,
    typo,
    space,
    isSmallPhone,
    isTablet,
    isLandscape,
    fS,
    sS,
    rS,
    iS,
  });

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage >= totalPages - 1;

  if (totalItems === 0) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* LEFT */}
        <View style={styles.left}>
          <Text style={styles.caption}>Per page</Text>

          <View style={styles.selectBox}>
            <Picker
              selectedValue={itemsPerPage}
              onValueChange={(val) => setItemsPerPage(Number(val))}
              dropdownIconColor={colors.muiPagination.body_text}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {options.map((opt) => (
                <Picker.Item
                  key={opt}
                  label={`${opt}`}
                  value={opt}
                  color={colors.muiPagination.body_text}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* RIGHT */}
        <View style={styles.right}>
          <Text style={styles.rangeText}>
            {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems}
          </Text>

          <View style={styles.controls}>
            <PaginationButton
              icon="first-page"
              disabled={isFirstPage}
              onPress={() => setCurrentPage(0)}
              styles={styles}
            />

            <PaginationButton
              icon="chevron-left"
              disabled={isFirstPage}
              onPress={() => setCurrentPage(currentPage - 1)}
              styles={styles}
            />

            <PaginationButton
              icon="chevron-right"
              disabled={isLastPage}
              onPress={() => setCurrentPage(currentPage + 1)}
              styles={styles}
            />

            <PaginationButton
              icon="last-page"
              disabled={isLastPage}
              onPress={() => setCurrentPage(totalPages - 1)}
              styles={styles}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MuiPagination;

const PaginationButton = ({ icon, onPress, disabled, styles }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
    >
      <MaterialIcons
        name={icon}
        size={styles.iconSize}
        color={
          disabled
            ? colors.muiPagination.disabled_text
            : colors.muiPagination.body_text
        }
      />
    </Pressable>
  );
};

const getStyles = ({
  colors,
  typo,
  space,
  isSmallPhone,
  isTablet,
  isLandscape,
  fS,
  sS,
  rS,
  iS,
}) => {
  const iconSize = isTablet ? iS(26) : isSmallPhone ? iS(18) : iS(22);

  return StyleSheet.create({
    iconSize,

    wrapper: {
      width: "100%",
      paddingVertical: space.sm,
      paddingHorizontal: isTablet ? space.md : space.xs,
      backgroundColor: colors.muiPagination.wrapper_bg,
      alignItems: isTablet ? "center" : "stretch",
    },

    container: {
      width: "100%",
      maxWidth: isTablet ? 700 : "100%",
      flexDirection: isSmallPhone && !isLandscape ? "column" : "row",
      alignItems: isSmallPhone && !isLandscape ? "stretch" : "center",
      justifyContent: "space-between",
      backgroundColor: colors.muiPagination.container_bg,
      borderRadius: rS(isTablet ? 18 : 14),
      borderWidth: 1,
      borderColor: colors.muiPagination.border_clr,
      paddingHorizontal: space.md,
      paddingVertical: space.sm,
      gap: space.sm,

      elevation: 2,
      shadowColor: colors.muiPagination.shadow,
      shadowOpacity: 0.08,
      shadowRadius: rS(6),
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },

    left: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: isSmallPhone && !isLandscape ? "flex-start" : "center",
      gap: space.xs,
      marginRight: !isSmallPhone && !isLandscape ? space.lg : 0,
    },

    caption: {
      fontSize: fS(isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4),
      color: colors.muiPagination.caption_text,
      fontWeight: "500",
    },

    selectBox: {
      width: isTablet ? sS(110) : isSmallPhone ? sS(80) : sS(95),
      height: isTablet ? sS(44) : sS(36),
      borderWidth: 1,
      borderColor: colors.muiPagination.select_border_clr,
      borderRadius: rS(8),
      overflow: "hidden",
      justifyContent: "center",
      backgroundColor: colors.muiPagination.select_bg,
    },

    picker: {
      color: colors.muiPagination.body_text,
      marginHorizontal: isSmallPhone ? -8 : -4,
      height: "100%",
    },

    pickerItem: {
      fontSize: fS(isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4),
    },

    right: {
      flex: 1,
      alignItems: isSmallPhone && !isLandscape ? "flex-start" : "flex-end",
    },

    rangeText: {
      fontSize: fS(isTablet ? typo.t5 : isSmallPhone ? typo.t3 : typo.t4),
      color: colors.muiPagination.body_text,
      fontWeight: "600",
      marginBottom: space.xs,
      textAlign: isSmallPhone && !isLandscape ? "left" : "right",
    },

    controls: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: space.xs,
    },

    button: {
      width: isTablet ? sS(42) : isSmallPhone ? sS(34) : sS(38),
      height: isTablet ? sS(42) : isSmallPhone ? sS(34) : sS(38),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: rS(10),
      backgroundColor: colors.muiPagination.button_bg,
    },

    buttonPressed: {
      backgroundColor: colors.muiPagination.button_pressed_bg,
      transform: [{ scale: 0.95 }],
    },

    buttonDisabled: {
      backgroundColor: colors.muiPagination.button_disabled_bg,
    },
  });
};
