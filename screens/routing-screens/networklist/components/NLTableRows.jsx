import React from "react";
import { Text, View } from "react-native";
import { useSectionlistTableStyles } from "../../../../styles/sectionlist-styles";

export default function NLTableRows({ row, previousRow, columns, altBgStyle }) {
  const styles = useSectionlistTableStyles();

  const showNetwork = !previousRow || row.network !== previousRow.network;

  const shouldHideCell = (td) => {
    if (td === "network") return !showNetwork;
    return false;
  };

  return (
    <View style={[styles.row, altBgStyle]}>
      {columns.map((col, idx) => {
        if (shouldHideCell(col.td)) {
          return (
            <View key={idx} style={[styles.cell, { minWidth: col.minWidth }]} />
          );
        }

        return (
          <View
            key={idx}
            style={[
              styles.cell,
              {
                minWidth: col.minWidth,
              },
            ]}
          >
            <Text style={styles.tdText}>{row[col.td]}</Text>
          </View>
        );
      })}
    </View>
  );
}
