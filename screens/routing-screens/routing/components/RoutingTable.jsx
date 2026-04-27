import React, { useCallback } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import RoutingTableBodyRows from "./RoutingTableBodyRows";
import { useSectionlistTableStyles } from "./sectionlist-styles";

export default function RoutingTable({
  panelHeading,
  data = [],
  columns = [],
  handleHrefNPT,
  handleHrefProvChange,
  handleHrefProvDelete,
  handleHrefOtpAdd,
  handleHrefOtpChange,
  handleHrefOtpDelete,
  handleHrefAddNumRouting,
}) {
  const styles = useSectionlistTableStyles();

  const phonePrefixColor = useCallback((row) => {
    if (
      row?.network_prefix &&
      row?.phone_prefix &&
      row.network_prefix !== row.phone_prefix
    ) {
      return styles.prefixMismatch;
    }
    return null;
  }, []);

  if (!data.length) {
    return <Text style={styles.emptyText}>No routing data</Text>;
  }

  const renderHeader = () => (
    <View style={[styles.row, styles.thead]}>
      {columns.map((col, index) => (
        <View key={index} style={[styles.cell, { width: col.width }]}>
          <Text style={styles.thText}>
            {col.th === "addNumberR" ? null : col.th}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.panel, styles.panelPrimary]}>
      <View style={[styles.panelHeading, styles.addButton]}>
        <Text style={styles.panelHeadingText}>{panelHeading}</Text>
      </View>

      <ScrollView horizontal>
        <View>
          {renderHeader()}

          <FlatList
            data={data}
            keyExtractor={(item, index) =>
              item?.id?.toString() ?? index.toString()
            }
            renderItem={({ item, index }) => (
              <RoutingTableBodyRows
                row={item}
                previousRow={data[index - 1]}
                columns={columns}
                altBgStyle={index % 2 === 1 ? styles.evenRow : null}
                rowStyle={phonePrefixColor(item)}
                handleHrefNPT={handleHrefNPT}
                handleHrefProvChange={handleHrefProvChange}
                handleHrefProvDelete={handleHrefProvDelete}
                handleHrefOtpAdd={handleHrefOtpAdd}
                handleHrefOtpChange={handleHrefOtpChange}
                handleHrefOtpDelete={handleHrefOtpDelete}
                handleHrefAddNumRouting={handleHrefAddNumRouting}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}
