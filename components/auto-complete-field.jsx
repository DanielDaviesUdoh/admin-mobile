// AutocompleteField.jsx
import { colors } from "@/constants/colors";
import { useAutocompleteFieldStyles } from "@/styles/autocompleteFieldStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

export default function AutocompleteField({
  width = "100%",
  label = "",
  dataSet,
  initialValue = "",
  onChange,
  activeRadioBtn,
  handleFocus,
  disabled = false,
  isLoading = false,
}) {
  const [focused, setFocused] = useState(false);

  const styles = useAutocompleteFieldStyles({
    width,
    focused,
    disabled,
  });

  const handleChildFocus = () => {
    if (disabled) return;
    setFocused(true);
  };

  const onFocus = handleFocus
    ? () => handleFocus(activeRadioBtn, setFocused, disabled)
    : handleChildFocus;

  const onBlur = () => {
    if (!disabled) {
      setFocused(false);
    }
  };

  return (
    <AutocompleteDropdown
      initialValue={initialValue}
      onFocus={onFocus}
      onBlur={onBlur}
      clearOnFocus={false}
      inputHeight={styles.inputHeight}
      suggestionsListMaxHeight={styles.suggestionsListMaxHeight}
      dataSet={dataSet}
      onSelectItem={(item) => {
        if (item) {
          onChange(item.value);
        }
      }}
      flatListProps={{
        ItemSeparatorComponent: null,
      }}
      renderItem={(item) => (
        <View style={styles.renderItemContainer}>
          <Text style={styles.renderItemText}>{item.title}</Text>
        </View>
      )}
      containerStyle={styles.containerStyle}
      textInputProps={{
        placeholder: `Search ${label}`,
        ...styles.textInputProps,
      }}
      inputContainerStyle={styles.inputContainerStyle}
      suggestionsListContainerStyle={styles.suggestionsListContainerStyle}
      suggestionsListTextStyle={styles.suggestionsListTextStyle}
      EmptyResultComponent={
        <Text style={isLoading ? styles.loadingText : styles.emptyText}>
          {isLoading ? "Loading..." : "Search does not match value"}
        </Text>
      }
      ChevronIconComponent={
        <Ionicons
          name="chevron-down"
          size={styles.chevronSize}
          color={styles.iconColor}
        />
      }
      ClearIconComponent={
        <Ionicons
          name="close-circle"
          size={styles.clearIconSize}
          color={colors.autocompleteField.global_black_clr}
        />
      }
    />
  );
}
