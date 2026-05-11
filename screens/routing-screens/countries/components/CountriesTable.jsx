import { useTablePanelStyles } from "@/styles/tablePanelStyles";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";

export default function CountriesTable({
  panelHeading,
  data,
  columns,
  currentPage,
}) {
  const styles = useTablePanelStyles();
  const router = useRouter();
  const flatListRef = useRef(null);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }, [currentPage]);

  if (!data) return null;

  const renderHeader = () => (
    <View style={[styles.row, styles.thead]}>
      {columns.map((col, index) => (
        <View key={index} style={[styles.cell, { minWidth: col.minWidth }]}>
          <Text style={styles.thText}>{col.th}</Text>
        </View>
      ))}
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 ? styles.evenRow : null]}>
      {columns.map((col, i) => {
        const value = item[col.td];

        return (
          <View key={i} style={[styles.cell, { minWidth: col.minWidth }]}>
            {col.td === "name" ? (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/routing/countrynetwork",
                    params: { CountryCode: item.code },
                  })
                }
              >
                <Text style={[styles.tdText, { color: "#337ab7" }]}>
                  {value}
                </Text>
              </Pressable>
            ) : (
              <Text style={styles.tdText}>{value}</Text>
            )}
          </View>
        );
      })}
    </View>
  );

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
              ref={flatListRef}
              data={data}
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
