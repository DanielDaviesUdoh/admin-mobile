import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSectionlistTableStyles } from "./sectionlist-styles";

export default function RoutingTRows({
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
}) {
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
          return (
            <View key={idx} style={[styles.cell, { minWidth: col.minWidth }]} />
          );
        }

        let content = null;

        if (col.td === "mccmnc") {
          if (showMccmnc) {
            content = (
              <Pressable onPress={() => handleHrefNPT?.(row.mccmnc)}>
                <Text style={styles.linkText}>{row.mccmnc}</Text>
              </Pressable>
            );
          }
        } else if (col.td === "provider") {
          content = (
            <View style={styles.inline}>
              <Text style={styles.tdText}>{row.provider}</Text>
              {row.network_prefix === row.phone_prefix ? (
                <Pressable
                  onPress={() => handleHrefProvChange?.(row.phone_prefix)}
                >
                  <Text style={styles.anchorAction}>[Change]</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => handleHrefProvDelete?.(row.phone_prefix)}
                >
                  <Text style={styles.anchorAction}>[Delete]</Text>
                </Pressable>
              )}
            </View>
          );
        } else if (col.td === "otp_provider") {
          if (!row.otp_provider) {
            content = (
              <Pressable onPress={() => handleHrefOtpAdd?.(row.phone_prefix)}>
                <Text style={[styles.anchorAction, styles.anchorAZeroMargin]}>
                  Add
                </Text>
              </Pressable>
            );
          } else {
            content = (
              <View style={styles.inline}>
                <Text style={styles.tdText}>{row.otp_provider}</Text>
                <Pressable
                  onPress={() => handleHrefOtpChange?.(row.phone_prefix)}
                >
                  <Text style={styles.anchorAction}>Change</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleHrefOtpDelete?.(row.phone_prefix)}
                >
                  <Text style={styles.anchorAction}>Delete</Text>
                </Pressable>
              </View>
            );
          }
        } else if (col.td === "addNumberR") {
          if (showMccmnc) {
            content = (
              <Pressable onPress={() => handleHrefAddNumRouting?.(row.mccmnc)}>
                <Text style={styles.addIcon}>+</Text>
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
                minWidth:
                  col.td === "otp_provider" && row.otp_provider
                    ? col.minWidth2
                    : col.minWidth,
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
