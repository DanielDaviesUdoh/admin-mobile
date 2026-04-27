import React from "react";
import { Text, View } from "react-native";
import { useSectionlistTableStyles } from "./sectionlist-styles";

export default function RoutingProvidersTRows({
  row,
  columns,
  altBgStyle,
  rowStyle,
}) {
  const styles = useSectionlistTableStyles();

  return (
    <View style={[styles.row, altBgStyle, rowStyle]}>
      {columns.map((col, idx) => (
        <View key={idx} style={[styles.cell, { minWidth: col.minWidth }]}>
          <Text style={styles.tdText}>{row[col.td] ?? ""}</Text>
        </View>
      ))}
    </View>
  );
}
