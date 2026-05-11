import { useCallback } from "react";
import { ScrollView, SectionList, View } from "react-native";
import NLTableHead from "./NLTableHead";
import NLTableRows from "./NLTableRows";

export default function NLFilteredTables({ filter, filteredData, columns }) {
  const renderRow = useCallback((item, section, index) => {
    return (
      <NLTableRows
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

  const uniqueCountries = [
    ...new Set(filteredData.map((item) => item["country_name"])),
  ];

  const allCountriesSections =
    uniqueCountries &&
    uniqueCountries.map((ctryName) => {
      const countryObj = filteredData.find(
        (item) => item["country_name"] === ctryName,
      );
      const countryData = filteredData.filter(
        (item) => item["country_name"] === ctryName,
      );

      const sections = {
        panelHeading: `${countryObj["country_name"]} (${countryObj["country"]})`,
        data: countryData,
        columns: columns,
      };

      return sections;
    });

  const singleCountrySection = [
    {
      panelHeading: `${filteredData[0]["country_name"]} (${filteredData[0]["country"]})`,
      data: filteredData,
      columns: columns,
    },
  ];

  const sectionsToRender =
    filter === "All countries" ? allCountriesSections : singleCountrySection;

  const renderHeader = ({ section }) => {
    return <NLTableHead section={section} />;
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
