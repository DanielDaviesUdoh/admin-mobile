import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { genDataSet } from "@/constants/menuItems";
import { useResponsive } from "@/hooks/useResponsive";
import { useMuiPaginationStyles } from "@/styles/muiPaginationStyles";
import AutocompleteFieldTwo from "../auto-complete-fieldtwo";

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
  const { isSmallPhone, isTablet } = useResponsive();
  const styles = useMuiPaginationStyles();

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage >= totalPages - 1;

  const optionsDataSet = genDataSet(options);

  if (totalItems === 0) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* LEFT */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.left}>
            <Text style={styles.caption}>Per page</Text>
            <View style={{ width: isTablet ? 110 : isSmallPhone ? 80 : 95 }}>
              <AutocompleteFieldTwo
                search={false}
                dataSet={optionsDataSet}
                value={itemsPerPage}
                onChange={(v) => setItemsPerPage(v)}
              />
            </View>

            {/* <MuiSelectField
              width={isTablet ? 110 : isSmallPhone ? 80 : 95}
              selected={itemsPerPage}
              setSelected={setItemsPerPage}
            >
              {options.map((opt) => (
                <Picker.Item
                  key={opt}
                  label={`${opt}`}
                  value={opt}
                  color={colors.muiPagination.body_text}
                />
              ))}
            </MuiSelectField> */}
          </View>

          <Text style={styles.rangeText}>
            {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems}
          </Text>
        </View>

        {/* RIGHT */}
        <View style={styles.right}>
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
