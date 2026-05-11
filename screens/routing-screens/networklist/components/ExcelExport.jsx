import { useFormOneStyles } from "@/styles/formOneStyles";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React from "react";
import { Alert, Pressable, Text } from "react-native";
import * as XLSX from "xlsx";

const ExcelExport = ({
  filteredData,
  fileName = "Networks",
  filter = "All",
}) => {
  const styles = useFormOneStyles();

  const exportToExcel = async () => {
    try {
      if (!filteredData?.length) {
        Alert.alert("No data available");
        return;
      }

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(filteredData);

      // Create workbook
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Convert workbook to base64
      const excelBase64 = XLSX.write(workbook, {
        type: "base64",
        bookType: "xlsx",
      });

      // File path
      const fileUri = `${FileSystem.Paths.cache.uri}/${fileName}-${filter}.xlsx`;

      // Create file
      const file = new FileSystem.File(fileUri);

      // Write file
      await file.write(excelBase64, {
        encoding: "base64",
      });

      // Share file
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.log("Excel export error:", error);

      Alert.alert("Export Failed", "Unable to export Excel file.");
    }
  };

  return (
    <Pressable
      style={[
        styles.buttonCont,
        {
          opacity: filteredData?.length > 0 ? 1 : 0.75,
        },
      ]}
      disabled={!filteredData?.length}
      onPress={exportToExcel}
    >
      <Text style={styles.buttonText}>Export to Excel</Text>
    </Pressable>
  );
};

export default ExcelExport;
