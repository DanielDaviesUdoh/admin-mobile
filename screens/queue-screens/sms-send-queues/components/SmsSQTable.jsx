import { useTablePanelStyles } from "@/styles/tablePanelStyles";
import React, { useCallback, useMemo } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import CountdownCircle from "./CountdownCircle";

const TOTAL = 5;

const SmsSQTable = ({
  panelHeading,
  data,
  columns,
  rowIndicators,
  getRowKey,
}) => {
  const styles = useTablePanelStyles();

  const flattenedRows = useMemo(() => {
    if (!data) return [];

    return data.flatMap((object, parentIndex) =>
      (object.rows || []).map((row, rowIndex) => ({
        ...row,
        __key: `${parentIndex}-${rowIndex}`,
      })),
    );
  }, [data]);

  const keyExtractor = useCallback((item) => {
    return item.__key;
  }, []);

  const renderRow = useCallback(
    ({ item, index }) => {
      const timer = rowIndicators?.[getRowKey?.(item)];

      return (
        <View style={[styles.row, index % 2 === 0 && styles.evenRow]}>
          {columns.map((col, colIndex) => {
            const key = col.td;
            const value = item[key];

            return (
              <View
                key={colIndex}
                style={[styles.cell, { minWidth: col.minWidth }]}
              >
                {key === "messageCount" ? (
                  <View style={styles.totalContainerSsmSQ}>
                    <Text
                      style={[styles.tdText, timer && styles.timerTextSsmSQ]}
                    >
                      {value}
                    </Text>

                    {timer && (
                      <CountdownCircle progress={(timer / TOTAL) * 360} />
                    )}
                  </View>
                ) : (
                  <Text style={styles.tdText}>{value ?? ""}</Text>
                )}
              </View>
            );
          })}
        </View>
      );
    },
    [columns, rowIndicators, styles, getRowKey],
  );

  const renderHeader = useCallback(() => {
    return (
      <View style={[styles.row, styles.thead]}>
        {columns.map((col, i) => (
          <View
            key={i}
            style={[
              styles.cell,
              styles.headerCellSsmSQ,
              { minWidth: col.minWidth },
            ]}
          >
            <Text style={styles.thText}>{col.th}</Text>
          </View>
        ))}
      </View>
    );
  }, [columns, styles]);

  if (!data) {
    return <Text style={styles.emptyText}>Data not available</Text>;
  }

  return (
    <View style={[styles.panel, styles.panelPrimary]}>
      <View style={styles.panelHeading}>
        <Text style={styles.panelHeadingText}>{panelHeading}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {renderHeader()}

          <FlatList
            data={flattenedRows}
            keyExtractor={keyExtractor}
            renderItem={renderRow}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SmsSQTable;
