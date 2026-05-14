import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { useCallback } from "react";
import { ScrollView, SectionList, Text, View } from "react-native";
import PNTableHead from "./PNTableHead";
import PNTableRows from "./PNTableRows";

export default function PNFilteredTable({
  initVal,
  filter,
  filteredData,
  columns,
}) {
  const styles = useSubScreenStyles();
  const renderRow = useCallback((item, section, index) => {
    return (
      <PNTableRows
        row={item}
        previousRow={section.data[index - 1]}
        columns={section.columns}
        altBgStyle={
          index % 2 === 0
            ? {
                backgroundColor: "#ccc",
              }
            : null
        }
      />
    );
  }, []);

  if (!filteredData) return null;

  if (!filteredData?.length)
    return (
      <View>
        <Text style={styles.noNetwork}>No network for {filter}</Text>
      </View>
    );

  const uniqueProviders = [
    ...new Set(filteredData?.map((item) => item["provider"])),
  ];

  const allProvidersSections =
    uniqueProviders &&
    uniqueProviders.map((providr) => {
      const providerObj = filteredData?.find(
        (item) => item["provider"] === providr,
      );
      const providerData = filteredData?.filter(
        (item) => item["provider"] === providr,
      );

      const sections = {
        panelHeading: providerObj["provider"],
        data: providerData,
        columns,
      };

      return sections;
    });

  const singleProviderSection = [
    {
      panelHeading: filteredData[0]["provider"],
      data: filteredData,
      columns,
    },
  ];

  const sectionsToRender =
    filter === initVal.provider ? allProvidersSections : singleProviderSection;

  const renderHeader = ({ section }) => {
    return <PNTableHead section={section} />;
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <SectionList
        sections={sectionsToRender}
        renderItem={({ item, section, index }) => {
          const lastIndex = section.data.length - 1;

          return (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#337ab7",
                borderTopWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: index === lastIndex ? "#337ab7" : "#ccc",
                borderBottomLeftRadius: index === lastIndex ? 4 : 0,
                borderBottomRightRadius: index === lastIndex ? 4 : 0,
              }}
            >
              {renderRow(item, section, index)}
            </View>
          );
        }}
        renderSectionHeader={renderHeader}
        renderSectionFooter={() => <View style={{ height: 24 }} />}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        stickySectionHeadersEnabled
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews
      />
    </ScrollView>
  );
}
