import InputFieldOne from "@/components/input-field-one";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import FeedbackTwo from "@/components/feedback-two";
import Loading from "@/components/loading";
import MuiPagination from "@/components/mui-pagination/MuiPagination";
import SearchFeedback from "@/components/search-feedback ";
import { usePagination } from "@/hooks/usePagination";
import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { View } from "react-native";
import { COLUMNS_DESGPROV } from "../constants/desgProvTHead";
import { useDeleteDesgProv, useDesignatedProvAll } from "../hooks/useDesgProv";
import DesgProvTable from "./DesgProvTable";

const DesignatedProviderScreen = ({ showBtn }) => {
  const styles = useSubScreenStyles();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [feedback, setFeedback] = useState({
    showStatus: null,
    showProgress: null,
  });

  const {
    data: desgProvData,
    isLoading: dPIsLoading,
    isError: dPIsError,
    statusCode: dPStatusCode,
  } = useDesignatedProvAll();
  const queryClient = useQueryClient();

  const { mutate, statusCode } = useDeleteDesgProv(queryClient, setFeedback);

  const handleDelete = (params) => {
    mutate(params);
  };

  const filteredData = useMemo(() => {
    if (!filter) return desgProvData;

    return desgProvData.filter((item) =>
      item?.client_id?.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [desgProvData, filter]);

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
      {!dPIsError && desgProvData?.length > 0 && showBtn && (
        <View style={styles.textfieldCont}>
          <InputFieldOne
            style={{ marginBottom: 12 }}
            placeholder="Filter by Client"
            value={filter}
            onChangeText={setFilter}
          />
        </View>
      )}

      {dPIsLoading && <Loading />}
      {filter && paginatedData?.length < 1 && (
        <SearchFeedback text={"client"} />
      )}
      {dPIsError && <FeedbackTwo statusCode={dPStatusCode} />}
      {!dPIsError && desgProvData?.length > 0 && paginatedData?.length > 0 && (
        <View style={styles.tableCont}>
          <DesgProvTable
            panelHeading={"Designated Providers"}
            data={paginatedData}
            columns={COLUMNS_DESGPROV}
            handleDelete={handleDelete}
            feedback={feedback}
            setFeedback={setFeedback}
            statusCode={statusCode}
          />
        </View>
      )}

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
};

export default DesignatedProviderScreen;
