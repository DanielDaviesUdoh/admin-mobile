import { useAutocompleteFieldStyles } from "@/styles/autocompleteFieldStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function AutocompleteFieldTwo({
  search = true,
  width = "100%",
  placeholder = "",
  dataSet,
  value = "",
  onChange,
  activeRadioBtn,
  handleFocus,
  disabled = false,
  isLoading = false,
}) {
  const [focused, setFocused] = useState(false);

  const styles = useAutocompleteFieldStyles({ width, focused, disabled });

  const handleChildFocus = () => {
    if (disabled) return;
    setFocused(true);
  };

  const onFocus = handleFocus
    ? () => handleFocus(activeRadioBtn, setFocused, disabled)
    : handleChildFocus;

  const onBlur = () => {
    if (!disabled) setFocused(false);
  };

  return (
    <Dropdown
      mode="default"
      placeholder={placeholder}
      search={search}
      data={dataSet}
      labelField="title"
      valueField="value"
      value={value}
      disable={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={(item) => {
        if (item) onChange(item.value);
      }}
      renderItem={(item) => (
        <View style={styles.renderItemContainer}>
          <Text style={styles.renderItemText}>{item.title}</Text>
        </View>
      )}
      renderRightIcon={() => (
        <Ionicons
          name="chevron-down"
          size={styles.chevronSize}
          color={styles.iconColor}
        />
      )}
      style={[styles.inputContainerStyle, width]}
      containerStyle={styles.suggestionsListContainerStyle}
      placeholderStyle={styles.placeholderProp}
      selectedTextStyle={styles.textInputProps.style}
      inputSearchStyle={styles.placeholderProp}
      flatListProps={{
        ItemSeparatorComponent: null,
        ListEmptyComponent: () => (
          <View style={{ paddingHorizontal: 16, paddingVertical: 2 }}>
            <Text style={isLoading ? styles.loadingText : styles.emptyText}>
              {isLoading ? "Loading..." : "Nothing to select"}
            </Text>
          </View>
        ),
      }}
    />
  );
}
