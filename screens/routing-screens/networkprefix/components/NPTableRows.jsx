import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSectionlistTableStyles } from "../../../../styles/sectionlist-styles";

export default function NPTableRows({
  row,
  previousRow,
  columns,
  altBgStyle,
  handleHrefAddPrefix,
}) {
  const styles = useSectionlistTableStyles();

  const showNetwork = !previousRow || row.network !== previousRow.network;
  const showMccmnc = !previousRow || row.mccmnc !== previousRow.mccmnc;

  const shouldHideCell = (td) => {
    if (td === "network") return !showNetwork;
    if (td === "mccmnc") return !showMccmnc;
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

        let content = null;

        if (col.td === "action") {
          if (showMccmnc) {
            content = (
              <Pressable
                style={styles.buttonCont}
                onPress={() => handleHrefAddPrefix?.(row.mccmnc)}
              >
                <Text style={styles.buttonText}>New Prefix</Text>
              </Pressable>
            );
          }
        } else {
          content = <Text style={styles.tdText}>{row[col.td]}</Text>;
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
            {content}
          </View>
        );
      })}
    </View>
  );
}
