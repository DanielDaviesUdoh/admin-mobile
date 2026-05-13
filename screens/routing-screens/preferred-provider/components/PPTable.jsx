import { platformFonts } from "@/constants/platform";
import { useTablePanelStyles } from "@/styles/tablePanelStyles";
import React, { Fragment } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

export default function PPTable({ panelHeading, data = [], columns }) {
  const styles = useTablePanelStyles();

  if (!data || data?.length < 1) return null;

  const flatListData = Object.entries(data);

  const providerRowBColor = (entry) => {
    const preferredProvider = entry?.preferredProvider;
    const provider = entry?.provider;

    if (!preferredProvider) {
      return null;
    }

    if (preferredProvider && provider) {
      const hasProvider = preferredProvider.split(", ").includes(provider);
      if (hasProvider) {
        return null;
      }
    }
    return { backgroundColor: "red" };
  };

  const renderHeader = () => (
    <View style={[styles.row, styles.thead, { backgroundColor: "#80B0DA" }]}>
      {columns.map((col, index) => (
        <View key={index} style={[styles.cell, { minWidth: col.minWidth }]}>
          <Text style={[styles.thText, { color: "#fff" }]}>{col.th}</Text>
        </View>
      ))}
    </View>
  );

  const renderItem = ({ item, index }) => {
    const [key, dataArray] = item;

    return (
      <Fragment key={index}>
        <View style={[styles.row, { backgroundColor: "#0094ff" }]}>
          <View style={[styles.cell, { width: "auto" }]}>
            <Text
              style={[
                styles.tdText,
                {
                  width: "100%",
                  textTransform: "uppercase",
                  color: "#fff",
                  fontFamily: platformFonts.bold,
                },
              ]}
            >
              {key}
            </Text>
          </View>
        </View>
        {dataArray.map((entry, entryIndex) => {
          return (
            <View
              key={`${index}+${entryIndex}`}
              style={[
                styles.row,
                entryIndex % 2 === 0 ? styles.evenRow : null,
                providerRowBColor(entry),
              ]}
            >
              {columns.map((col, i) => {
                return (
                  <View
                    key={i}
                    style={[styles.cell, { minWidth: col.minWidth }]}
                  >
                    <Text style={styles.tdText}>{entry[col.td]}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </Fragment>
    );
  };

  return (
    <View style={[styles.panel, styles.panelPrimary]}>
      <View style={styles.panelHeading}>
        <Text style={styles.panelHeadingText}>{panelHeading}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          {renderHeader()}
          <View>
            <FlatList
              data={flatListData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={true}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              windowSize={10}
              removeClippedSubviews
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
