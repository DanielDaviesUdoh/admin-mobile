import FeedbackTwo from "@/components/feedback-two";
import InputFieldOne from "@/components/input-field-one";
import Loading from "@/components/loading";
import MuiPagination from "@/components/mui-pagination/MuiPagination";
import SearchFeedback from "@/components/search-feedback ";
import { usePagination } from "@/hooks/usePagination";
import { useRoutingCountries } from "@/hooks/useRoutingShared";
import { useEffect, useMemo, useState } from "react";
import { COLUMNS_CTRY } from "../constants/countriesTHead";
import CountriesTable from "./CountriesTable";

export default function CountriesScreen({ showBtn }) {
  const { data = [], isLoading, isError, statusCode } = useRoutingCountries();

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
    <>
      {!isError && data.length > 0 && showBtn && (
        <InputFieldOne
          style={{ marginBottom: 12 }}
          width="75%"
          placeholder="Filter by name"
          value={filter}
          onChangeText={setFilter}
        />
      )}

      {isLoading && <Loading />}
      {isError && <FeedbackTwo statusCode={statusCode} />}

      {!isError &&
        !isLoading &&
        (filter && filteredData.length === 0 ? (
          <SearchFeedback text="name" />
        ) : (
          <CountriesTable
            panelHeading="Countries"
            data={paginatedData}
            columns={COLUMNS_CTRY}
            currentPage={currentPage}
            PaginationComponent={
              <MuiPagination
                totalItems={totalItems}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                startIndex={startIndex}
                endIndex={endIndex}
                setCurrentPage={setCurrentPage}
                setItemsPerPage={setItemsPerPage}
              />
            }
          />
        ))}
    </>
  );
}
