import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { genDataSet } from "@/constants/menuItems";
import useMuiPaginationServer from "@/hooks/useMuiPaginationServer";
import { useResponsive } from "@/hooks/useResponsive";
import { useMuiPaginationStyles } from "@/styles/muiPaginationStyles";
import AutocompleteFieldTwo from "../auto-complete-fieldtwo";

const MuiPaginationServer = (props) => {
  const { isSmallPhone, isTablet } = useResponsive();
  const styles = useMuiPaginationStyles();

  const { isLoading } = props;
  const pickerOptions = props.option || [20, 50, 100];
  const optionsDataSet = genDataSet(pickerOptions);

  const {
    data,
    totalItems,
    currentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    setRequestedPage,
    setRequestedItemsPerPage,
  } = useMuiPaginationServer(props);

  const totalPages = Math.ceil(totalItems / itemsPerPage) - 1;
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage >= totalPages;

  const textRange = !data
    ? `${startIndex} of ${totalItems}`
    : `${startIndex + 1} - ${Math.min(endIndex, totalItems)} of ${totalItems}`;

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
                onChange={(itemVal) => {
                  setRequestedItemsPerPage(itemVal);
                  setRequestedPage(0);
                  props.setRunFetchData(true);
                }}
              />
            </View>

            {/* <MuiSelectField
              width={isTablet ? 110 : isSmallPhone ? 80 : 95}
              selected={itemsPerPage}
              setSelected={(itemVal) => {
                setRequestedItemsPerPage(itemVal);
                setRequestedPage(0);
                props.setRunFetchData(true);
              }}
              disabled={isLoading}
            >
              {pickerOptions.map((opt) => (
                <Picker.Item
                  key={opt}
                  label={`${opt}`}
                  value={opt}
                  color={colors.muiPagination.body_text}
                />
              ))}
            </MuiSelectField> */}
          </View>

          <Text style={styles.rangeText}>{textRange}</Text>
        </View>

        {/* RIGHT */}
        <View style={styles.right}>
          <View style={styles.controls}>
            <PaginationButton
              icon="first-page"
              disabled={isFirstPage || isLoading}
              onPress={() => {
                setRequestedPage(0);
                props.setRunFetchData(true);
              }}
              styles={styles}
            />

            <PaginationButton
              icon="chevron-left"
              disabled={isFirstPage || isLoading}
              onPress={() => {
                setRequestedPage(currentPage - 1);
                props.setRunFetchData(true);
              }}
              styles={styles}
            />

            <PaginationButton
              icon="chevron-right"
              disabled={isLastPage || isLoading}
              onPress={() => {
                setRequestedPage(currentPage + 1);
                props.setRunFetchData(true);
              }}
              styles={styles}
            />

            <PaginationButton
              icon="last-page"
              disabled={isLastPage || isLoading}
              onPress={() => {
                setRequestedPage(totalPages);
                props.setRunFetchData(true);
              }}
              styles={styles}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MuiPaginationServer;

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
