import FeedbackTwo from "@/components/feedback-two";
import InputFieldOne from "@/components/input-field-one";
import Loading from "@/components/loading";
import MuiPagination from "@/components/mui-pagination/MuiPagination";
import SearchFeedback from "@/components/search-feedback ";
import { usePagination } from "@/hooks/usePagination";
import { useRoutingCountries } from "@/hooks/useRoutingShared";
import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { COLUMNS_CTRY } from "../constants/countriesTHead";
import CountriesTable from "./CountriesTable";

export default function CountriesScreen({ showBtn }) {
  const { data = [], isLoading, isError, statusCode } = useRoutingCountries();
  const styles = useSubScreenStyles();

  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const filteredData = useMemo(() => {
    if (!filter) return data;

    return data.filter((item) =>
      item?.name?.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [data, filter]);

  const { paginatedData, totalItems, startIndex, endIndex } = usePagination({
    data: filteredData,
    currentPage,
    itemsPerPage,
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [filter, itemsPerPage]);

  return (
    <View style={styles.cont}>
      {!isError && data.length > 0 && showBtn && (
        <View style={styles.textfieldCont}>
          <InputFieldOne
            style={{ marginBottom: 12 }}
            placeholder="Filter by name"
            value={filter}
            onChangeText={setFilter}
          />
        </View>
      )}

      {isLoading && <Loading />}
      {isError && <FeedbackTwo statusCode={statusCode} />}
      {!isError &&
        !isLoading &&
        (filter && filteredData.length === 0 ? (
          <SearchFeedback text="name" />
        ) : (
          <View style={styles.tableCont}>
            <CountriesTable
              panelHeading="Countries"
              data={paginatedData}
              columns={COLUMNS_CTRY}
              currentPage={currentPage}
            />
          </View>
        ))}
      <MuiPagination
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
      />
    </View>
  );
}
