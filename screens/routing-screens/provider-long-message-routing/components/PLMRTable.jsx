import TableRowFeedback from "@/components/tablerow-feedback";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { useTablePanelStyles } from "@/styles/tablePanelStyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";

const PLMRTable = ({
  panelHeading,
  data,
  columns,
  handleOpenAdd,
  handleOpenEdit,
  handleDelete,
  feedback,
  setFeedback,
  statusCode,
}) => {
  const { confirmDialog } = useConfirmDialog();
  const styles = useTablePanelStyles();

  if (!data || data.length < 1) {
    return (
      <View style={[styles.panel, styles.panelPrimary]}>
        <View style={styles.panelHeading}>
          <Text style={styles.panelHeadingText}>{panelHeading}</Text>
        </View>

        <Text style={styles.emptyText}>No Sender IDs available</Text>
      </View>
    );
  }

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

      const params = {
        provider: object["provider"],
        mccmnc: object["mccmnc"],
      };
      handleDelete(params);
    }
  };

  const renderHeader = () => (
    <View style={[styles.row, styles.thead]}>
      {columns.map((column, index) => (
        <View key={index} style={[styles.cell, { minWidth: column.minWidth }]}>
          {column.td === "action" ? (
            <Pressable
              style={({ pressed }) => [
                styles.buttonCont,
                pressed && styles.buttonContPressed,
              ]}
              onPress={handleOpenAdd}
            >
              <Text style={styles.buttonText}>Add Long Message Provider</Text>
            </Pressable>
          ) : (
            <Text style={styles.thText}>{column.th}</Text>
          )}
        </View>
      ))}
    </View>
  );

  const renderActionButtons = (item, index) => (
    <View style={styles.actionContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          styles.editButton,
          pressed && styles.actionButtonPressed,
        ]}
        onPress={() =>
          handleOpenEdit(
            item.provider,
            item.over_160_char_provider,
            item.mccmnc,
            item.msg_len,
          )
        }
      >
        <Ionicons
          name="create-outline"
          size={styles.iconSize}
          color="#3F51B5"
        />

        <Text style={styles.editButtonText}>Edit</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          styles.deleteButton,
          pressed && styles.actionButtonPressed,
        ]}
        onPress={() => deleteTableRow(item, index)}
      >
        <Ionicons name="trash-outline" size={styles.iconSize} color="#EF4444" />

        <Text style={styles.deleteButtonText}>
          {feedback.showProgress === index ? "Deleting..." : "Delete"}
        </Text>
      </Pressable>

      {feedback.showStatus === index && statusCode && (
        <TableRowFeedback statusCode={statusCode} />
      )}
    </View>
  );

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.row, index % 2 === 0 && styles.evenRow]}>
        {columns.map((column, colIndex) => {
          const isAction = column.td === "action";

          return (
            <View
              key={colIndex}
              style={[styles.cell, { minWidth: column.minWidth }]}
            >
              {isAction ? (
                renderActionButtons(item, index)
              ) : (
                <Text style={styles.tdText}>{item[column.td]}</Text>
              )}
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

          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
            removeClippedSubviews
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PLMRTable;
