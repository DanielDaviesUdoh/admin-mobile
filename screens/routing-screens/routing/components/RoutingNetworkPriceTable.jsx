import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const COLUMNS = [
  { th: "Provider", td: "provider", minWidth: 120 },
  { th: "Price", td: "usd_value", minWidth: 90 },
  { th: "Provider Price", td: "mt_price", minWidth: 120 },
];

const RoutingNetworkPriceTable = ({ nPDataLoading, nPData }) => {
  const sortedData =
    nPData?.length > 0 ? [...nPData].sort((a, b) => a.price - b.price) : [];
  const minPrice = sortedData?.length > 0 ? sortedData[0]["usd_value"] : null;
  const maxPrice =
    sortedData?.length > 0
      ? sortedData[sortedData.length - 1]["usd_value"]
      : null;

  const phonePrefixColor = (item) => {
    if (!item) return {};
    if (item.usd_value === minPrice) return { backgroundColor: "#8BC34A" };
    if (item.usd_value === maxPrice) return { backgroundColor: "#FF6666" };
    return { backgroundColor: "#FFA500" };
  };

  if (nPDataLoading) {
    return (
      <View style={[styles.panel, styles.panelPrimary]}>
        <View style={styles.panelHeading}>
          <Text style={styles.panelHeadingText}>Network Price</Text>
        </View>

        <Text style={styles.emptyText}>Network price loading...</Text>
      </View>
    );
  }

  if (!nPData || nPData.length < 1) {
    return (
      <View style={[styles.panel, styles.panelPrimary]}>
        <View style={styles.panelHeading}>
          <Text style={styles.panelHeadingText}>Network Price</Text>
        </View>

        <Text style={styles.emptyText}>Network price is not available</Text>
      </View>
    );
  }

  const renderHeader = () => (
    <View style={[styles.row, styles.thead]}>
      {COLUMNS.map((col, index) => (
        <View key={index} style={[styles.cell, { minWidth: col.minWidth }]}>
          <Text style={styles.thText}>{col.th}</Text>
        </View>
      ))}
    </View>
  );

  const renderRow = ({ item, index }) => (
    <View
      style={[
        styles.row,
        index % 2 === 0 ? styles.evenRow : {},
        phonePrefixColor(item),
      ]}
    >
      {COLUMNS.map((col, colIndex) => (
        <View key={colIndex} style={[styles.cell, { minWidth: col.minWidth }]}>
          <Text style={styles.tdText}>
            {col.td === "mt_price" && index === 1
              ? `( ${item.mt_currency ?? ""} ${item[col.td]} )`
              : col.td === "mt_price"
                ? `(${item[col.td]})`
                : item[col.td]}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.panel, styles.panelPrimary]}>
      <View style={styles.panelHeading}>
        <Text style={styles.panelHeadingText}>Network Price</Text>
      </View>
      <View style={styles.table}>
        {renderHeader()}
        <FlatList
          data={sortedData}
          renderItem={renderRow}
          keyExtractor={(item, index) =>
            item.id?.toString() ?? index.toString()
          }
        />
      </View>
    </View>
  );
};

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
  },
  row: {
    flexDirection: "row",
    minHeight: 32,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  evenRow: {
    backgroundColor: "#ccc",
  },

  /* ---------- CELLS ---------- */
  cell: {
    paddingHorizontal: 12,
    paddingVertical: 6,
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

export default RoutingNetworkPriceTable;
