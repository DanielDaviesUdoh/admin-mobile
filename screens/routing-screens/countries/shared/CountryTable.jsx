import { useTablePanelStyles } from "@/styles/tablePanelStyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";

const CountryTable = ({
  panelHeading,
  data,
  columns,
  captionError,
  handleHrefCtryNetworks,
  handleHrefCtryRoute,
  handleHrefCtryNetworkPrefix,
  routeLinks,
}) => {
  const styles = useTablePanelStyles();

  if (!data || data.length < 1) {
    return (
      <View style={[styles.panel, styles.panelPrimary]}>
        <View style={styles.panelHeading}>
          <Text style={styles.panelHeadingText}>{panelHeading}</Text>
        </View>
        <Text style={styles.emptyText}>
          No {captionError} for selected country
        </Text>
      </View>
    );
  }

  const phonePrefixColor = (item) => {
    if (item.network_prefix && item.phone_prefix) {
      if (item.network_prefix !== item.phone_prefix) {
        return styles.prefixMismatch;
      }
    }
    return null;
  };

  const renderHeader = () => (
    <View style={[styles.row, styles.thead]}>
      {columns.map((col, index) => {
        if (
          col.td === "actionCN" ||
          col.td === "actionCR" ||
          col.td === "actionCNP"
        ) {
          return (
            <View
              key={index}
              style={[styles.cell, { minWidth: col.minWidth }]}
            />
          );
        }

        return (
          <View key={index} style={[styles.cell, { minWidth: col.minWidth }]}>
            <Text style={styles.thText}>{col.th}</Text>
          </View>
        );
      })}
    </View>
  );

  const renderItem = ({ item, index }) => {
    const previousRow = index > 0 ? data[index - 1] : null;

    const showNetwork = !previousRow || item.network !== previousRow.network;

    const showMccmnc = !previousRow || item.mccmnc !== previousRow.mccmnc;

    const showClientId =
      !previousRow || item.client_id !== previousRow.client_id;

    return (
      <View
        style={[
          styles.row,
          index % 2 === 0 && styles.evenRow,
          phonePrefixColor(item),
        ]}
      >
        {columns.map((col, colIndex) => {
          const header = col.td;
          let content = null;

          if (
            (header === "network" || header === "network_name") &&
            !showNetwork
          ) {
            content = null;
          } else if (header === "client_id" && !showClientId) {
            content = null;
          } else if (header === "mccmnc" && !showMccmnc) {
            content = null;
          } else if (header === "prefix_status") {
            content = <Text style={styles.tdText}>ACTIVE</Text>;
          } else if (header === "actionCN") {
            content = showMccmnc && (
              <Pressable
                style={styles.buttonCont}
                onPress={() => handleHrefCtryNetworks(item.mccmnc)}
              >
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            );
          } else if (header === "actionCR") {
            content = showNetwork && (
              <Pressable
                style={styles.buttonCont}
                onPress={() => handleHrefCtryRoute(item.network)}
              >
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            );
          } else if (header === "actionCNP") {
            content = showMccmnc && (
              <Pressable
                style={styles.buttonCont}
                onPress={() => handleHrefCtryNetworkPrefix(item.mccmnc)}
              >
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            );
          } else if (header === "") {
            content = (
              <Pressable
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Ionicons name="trash-outline" size={14} />
                <Text style={styles.tdText}>Delete</Text>
              </Pressable>
            );
          } else {
            content = <Text style={styles.tdText}>{item[header]}</Text>;
          }

          return (
            <View
              key={colIndex}
              style={[styles.cell, { minWidth: col.minWidth }]}
            >
              {content}
            </View>
          );
        })}
      </View>
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

          <View style={{ maxHeight: 350 }}>
            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              ListFooterComponent={routeLinks || null}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CountryTable;
