import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSectionlistTableStyles } from "./sectionlist-styles";

const RoutingTableBodyRows = ({
  row,
  previousRow,
  columns,
  altBgStyle,
  rowStyle,
  handleHrefNPT,
  handleHrefProvChange,
  handleHrefProvDelete,
  handleHrefOtpAdd,
  handleHrefOtpChange,
  handleHrefOtpDelete,
  handleHrefAddNumRouting,
}) => {
  const styles = useSectionlistTableStyles();

  const showCountry =
    !previousRow || row.country_name !== previousRow.country_name;
  const showNetwork = !previousRow || row.network !== previousRow.network;
  const showMccmnc = !previousRow || row.mccmnc !== previousRow.mccmnc;

  const shouldHideCell = (td) => {
    if (td === "country_name") return !showCountry;
    if (td === "network") return !showNetwork;
    return false;
  };

  return (
    <View style={[styles.row, altBgStyle, rowStyle]}>
      {columns.map((col, idx) => {
        if (shouldHideCell(col.td)) {
          return <View key={idx} style={[styles.cell, { width: col.width }]} />;
        }

        let content = null;

        if (col.td === "mccmnc") {
          if (showMccmnc) {
            content = (
              <Pressable onPress={() => handleHrefNPT?.(row)}>
                <Text style={styles.linkText}>{row.mccmnc}</Text>
              </Pressable>
            );
          }
        } else if (col.td === "provider") {
          content = (
            <View style={styles.inline}>
              <Text style={styles.tdText}>{row.provider}</Text>
              {row.network_prefix === row.phone_prefix ? (
                <Pressable onPress={() => handleHrefProvChange?.(row)}>
                  <Text style={styles.anchorAction}>[Change]</Text>
                </Pressable>
              ) : (
                <Pressable onPress={() => handleHrefProvDelete?.(row)}>
                  <Text style={styles.anchorAction}>[Delete]</Text>
                </Pressable>
              )}
            </View>
          );
        } else if (col.td === "otp_provider") {
          if (!row.otp_provider) {
            content = (
              <Pressable onPress={() => handleHrefOtpAdd?.(row)}>
                <Text style={styles.anchorAction}>Add</Text>
              </Pressable>
            );
          } else {
            content = (
              <View style={styles.inline}>
                <Text style={styles.tdText}>{row.otp_provider}</Text>
                <Pressable onPress={() => handleHrefOtpChange?.(row)}>
                  <Text style={styles.anchorAction}>Change</Text>
                </Pressable>
                <Pressable onPress={() => handleHrefOtpDelete?.(row)}>
                  <Text style={styles.anchorAction}>Delete</Text>
                </Pressable>
              </View>
            );
          }
        } else if (col.td === "addNumberR") {
          if (showMccmnc) {
            content = (
              <Pressable onPress={() => handleHrefAddNumRouting?.(row)}>
                <Text style={styles.addIcon}>+</Text>
              </Pressable>
            );
          }
        } else {
          content = <Text style={styles.tdText}>{row[col.td]}</Text>;
        }

        return (
          <View key={idx} style={[styles.cell, { width: col.width }]}>
            {content}
          </View>
        );
      })}
    </View>
  );
};

export default RoutingTableBodyRows;
