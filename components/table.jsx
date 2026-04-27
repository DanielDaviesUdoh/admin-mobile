import React, { useCallback } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

export default function TableComponent({ panelHeading, data = [], columns }) {
  const getRowStyle = useCallback((item) => {
    if (
      item?.network_prefix &&
      item?.phone_prefix &&
      item.network_prefix.length !== item.phone_prefix.length
    ) {
      return styles.prefixMismatch;
    }
    return null;
  }, []);

  if (!data || data.length === 0) {
    return <Text style={styles.emptyText}>Data not available</Text>;
  }

  const resolvedColumns =
    columns ??
    Object.keys(data[0]).map((key) => ({
      key,
      label: key,
      width: 120,
    }));

  const renderHeader = () => (
    <View style={[styles.row, styles.thead]}>
      {resolvedColumns.map((col) => (
        <View key={col.key} style={[styles.cell, { width: col.width }]}>
          <Text style={styles.thText}>{col.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 && styles.evenRow, getRowStyle(item)]}
    >
      {resolvedColumns.map((col) => (
        <View key={col.key} style={[styles.cell, { width: col.width }]}>
          <Text style={styles.tdText}>{item[col.key] ?? ""}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.panel, styles.panelPrimary]}>
      {panelHeading && (
        <View style={styles.panelHeading}>
          <Text style={styles.panelHeadingText}>{panelHeading}</Text>
        </View>
      )}

      <ScrollView horizontal>
        <View>
          {renderHeader()}

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item.id?.toString() ?? index.toString()
            }
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
            removeClippedSubviews
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  /* ---------- PANEL ---------- */
  panel: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  panelPrimary: {
    borderColor: "#337ab7",
  },
  panelHeading: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#425f9c",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  panelHeadingText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  /* ---------- TABLE ---------- */
  thead: {
    backgroundColor: "whitesmoke",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    minHeight: 32,
    alignItems: "center",
  },
  evenRow: {
    backgroundColor: "#ccc",
  },

  /* ---------- CELLS ---------- */
  cell: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "center",
  },
  thText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
    textTransform: "capitalize",
  },
  tdText: {
    fontSize: 12,
    color: "#333",
  },

  /* ---------- STATES ---------- */
  prefixMismatch: {
    backgroundColor: "#FFB3B3",
  },
  emptyText: {
    padding: 12,
    fontSize: 13,
    color: "#777",
  },
});
