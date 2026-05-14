import FeedbackTwo from "@/components/feedback-two";
import InputFieldOne from "@/components/input-field-one";
import Loading from "@/components/loading";
import MuiPaginationServer from "@/components/mui-pagination/MuiPaginationServer";
import SearchFeedback from "@/components/search-feedback ";
import { ROUTING_ROUTED_NUMBERS } from "@/services/routingEndpoints";
import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { COLUMNS_ROUTINGLOG } from "../constants/routinglogTHead";
import { useDeleteRoutingLog } from "../hooks/useRoutingLog";
import RoutingLogTable from "./RoutingLogTable";

const RoutingLogScreen = ({ showBtn }) => {
  const styles = useSubScreenStyles();
  const [rawData, setRawData] = useState([]);
  const [runFetchData, setRunFetchData] = useState(true);
  const [pagQueryKey, setPagQueryKey] = useState(null);
  const [filter, setFilter] = useState("");
  const [feedback, setFeedback] = useState({
    showStatus: null,
    showProgress: null,
  });
  const [dataSignal, setDataSignal] = useState({
    isLoading: false,
    isError: false,
    statusCode: null,
  });

  const isLoading = dataSignal.isLoading;

  const queryClient = useQueryClient();
  const { mutate, statusCode } = useDeleteRoutingLog(
    queryClient,
    pagQueryKey,
    setRunFetchData,
    setFeedback,
  );

  const getNewData = useCallback((data) => {
    setRawData(data);
  }, []);

  const slicedData = useMemo(() => {
    if (!filter) return rawData;

    return rawData.filter((item) =>
      item.to_provider?.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [rawData, filter]);

  const createPagEndpoint = (page, itemsPerPage) => {
    return `${ROUTING_ROUTED_NUMBERS}?page-no=${page}&size=${itemsPerPage}`;
  };

  const createPagQueryKey = useCallback((page, itemsPerPage) => {
    return ["routingLogPagination", page, itemsPerPage];
  }, []);

  const handleDelete = (params) => {
    mutate(params);
  };

  return (
    <View style={styles.cont}>
      {rawData && showBtn && (
        <View style={styles.textfieldCont}>
          <InputFieldOne
            style={{ marginBottom: 12 }}
            placeholder="Filter by To Provider"
            value={filter}
            onChangeText={setFilter}
          />
        </View>
      )}

      {filter && slicedData?.length < 1 && <SearchFeedback text={"provider"} />}
      {slicedData?.length > 0 ? (
        <View style={styles.tableCont}>
          <RoutingLogTable
            panelHeading={"Routing Log"}
            data={slicedData}
            columns={COLUMNS_ROUTINGLOG}
            handleDelete={handleDelete}
            feedback={feedback}
            setFeedback={setFeedback}
            statusCode={statusCode}
          />
        </View>
      ) : (
        !filter &&
        !dataSignal.isLoading &&
        !dataSignal.isError && (
          <Text style={styles.noNetwork}>Data not available</Text>
        )
      )}
      <View style={{ height: 30 }}>
        {dataSignal.isLoading && <Loading />}
        {dataSignal.isError && (
          <FeedbackTwo statusCode={dataSignal.statusCode} />
        )}
      </View>
      <MuiPaginationServer
        runFetchData={runFetchData}
        setRunFetchData={setRunFetchData}
        createPagEndpoint={createPagEndpoint}
        createPagQueryKey={createPagQueryKey}
        responseDot="routed-numbers"
        responseTPages="total_elements"
        getNewData={getNewData}
        setDataSignal={setDataSignal}
        setPagQueryKey={setPagQueryKey}
        isLoading={isLoading}
      />
    </View>
  );
};

export default RoutingLogScreen;
