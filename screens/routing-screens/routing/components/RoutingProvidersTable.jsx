import React, { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { useSectionlistTableStyles } from "./sectionlist-styles";

const RoutingProvidersTable = ({
  panelHeading,
  data = [],
  columns,
  caption,
}) => {
  const styles = useSectionlistTableStyles();

  const phonePrefixColor = useCallback(
    (row) => {
      if (
        row?.network_prefix &&
        row?.phone_prefix &&
        row.network_prefix !== row.phone_prefix
      ) {
        return styles.prefixMismatch;
      }
      return null;
    },
    [styles.prefixMismatch],
  );

  const renderHeader = () => (
    <View style={[styles.row, styles.thead]}>
      {columns.map((col, index) => (
        <View key={index} style={[styles.cell, col.width]}>
          <Text style={styles.thText}>{col.th}</Text>
        </View>
      ))}
    </View>
  );

  const renderRow = ({ item, index }) => (
    <View
      style={[
        styles.row,
        index % 2 === 1 ? styles.evenRow : null,
        phonePrefixColor(item),
      ]}
    >
      {columns.map((col, idx) => (
        <View key={idx} style={[styles.cell, col.width]}>
          <Text style={styles.tdText}>{item[col.td] ?? ""}</Text>
        </View>
      ))}
    </View>
  );

  if (!data || data.length === 0) {
    return (
      <View style={[styles.panel, styles.panelPrimary]}>
        <View style={styles.panelHeading}>
          <Text style={styles.panelHeadingText}>{panelHeading}</Text>
        </View>
        <Text style={styles.emptyText}>{caption ?? "No data available"}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.panel, styles.panelPrimary]}>
      <View style={styles.panelHeading}>
        <Text style={styles.panelHeadingText}>{panelHeading}</Text>
      </View>

      {renderHeader()}

      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
      />
    </View>
  );
};

export default RoutingProvidersTable;
