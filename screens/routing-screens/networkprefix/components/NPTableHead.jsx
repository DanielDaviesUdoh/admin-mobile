import React from "react";
import { Text, View } from "react-native";
import { useSectionlistTableStyles } from "../../../../styles/sectionlist-styles";

export default function NPTableHead({ section }) {
  const styles = useSectionlistTableStyles();

  const renderHeader = () => (
    <View style={[styles.row, styles.thead]}>
      {section.columns.map((col, index) => (
        <View key={index} style={[styles.cell, { minWidth: col.minWidth }]}>
          <Text style={styles.thText}>
            {col.th === "action" ? null : col.th}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.panel, styles.panelPrimary]}>
      <View style={[styles.panelHeading]}>
        <Text style={styles.panelHeadingText}>{section.panelHeading}</Text>
      </View>

      {renderHeader()}
    </View>
  );
}
