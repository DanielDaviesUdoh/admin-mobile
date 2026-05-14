import TableRowFeedback from "@/components/tablerow-feedback";
import { dateOnly, timeOnly } from "@/constants/dateAndTime";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { useTablePanelStyles } from "@/styles/tablePanelStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";

export default function RoutingLogTable({
  panelHeading,
  data = [],
  columns,
  handleDelete,
  feedback,
  setFeedback,
  statusCode,
  currentPage,
}) {
  const styles = useTablePanelStyles();
  const { confirmDialog } = useConfirmDialog();

  const flatListRef = useRef(null);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }, [currentPage]);

  if (!data) return null;

  const deleteTableRow = async (object, tbIndex) => {
    const confirmDelete = await confirmDialog({
      message: "Are you sure you want to delete?",
    });
    if (confirmDelete) {
      setFeedback((prevFB) => ({
        ...prevFB,
        showStatus: tbIndex,
        showProgress: tbIndex,
      }));

      const params = object["id"];
      handleDelete(params);
    }
  };

  const renderHeader = () => (
    <View style={[styles.row, styles.thead, { backgroundColor: "#0094ff" }]}>
      {columns.map((col, index) => (
        <View key={index} style={[styles.cell, { minWidth: col.minWidth }]}>
          <Text
            style={[
              styles.thText,
              { textTransform: "uppercase", color: "#fff" },
            ]}
          >
            {col.th}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 ? styles.evenRow : null]}>
      {columns.map((col, i) => {
        const header = col.td;
        let content = null;

        if (header === "date") {
          content = (
            <Text style={styles.tdText}>{dateOnly(item["change_time"])}</Text>
          );
        } else if (header === "time") {
          content = (
            <Text style={styles.tdText}>{timeOnly(item["change_time"])}</Text>
          );
        } else if (header === "action") {
          content = (
            <View style={styles.actionContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.deleteButton,
                  pressed && styles.actionButtonPressed,
                ]}
                onPress={() => deleteTableRow(item, index)}
              >
                <Ionicons
                  name="trash-outline"
                  size={styles.iconSize}
                  color="#EF4444"
                />

                <Text style={styles.deleteButtonText}>
                  {feedback.showProgress === index ? "..." : ""}
                </Text>
              </Pressable>

              {feedback.showStatus === index && statusCode && (
                <TableRowFeedback statusCode={statusCode} />
              )}
            </View>
          );
        } else {
          content = <Text style={styles.tdText}>{item[header]}</Text>;
        }

        return (
          <View key={i} style={[styles.cell, { minWidth: col.minWidth }]}>
            {content}
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
