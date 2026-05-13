import FeedbackTwo from "@/components/feedback-two";
import Loading from "@/components/loading";
import MuiDialogSlide from "@/components/mui-dialogue-slide";
import {
  useNetworkListAll,
  useRoutingActiveProviders,
} from "@/hooks/useRoutingShared";
import { useSubScreenStyles } from "@/styles/subScreenStyles";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { View } from "react-native";
import { getPlmrHrefModal } from "../constants/plmrHrefModal";
import { COLUMNS_PLMR } from "../constants/provLMRTHead";
import {
  useDeleteLongMessageProv,
  useLongMessageProvAll,
} from "../hooks/useProvLMR";
import PLMRForm from "./PLMRForm";
import PLMRTable from "./PLMRTable";

const ProviderLongMessageRoutingScreen = () => {
  const styles = useSubScreenStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editObj, setEditObj] = useState(null);
  const [feedback, setFeedback] = useState({
    showStatus: null,
    showProgress: null,
  });

  const {
    data: lmpaData,
    isLoading: lmpaIsLoading,
    isError: lmpaIsError,
    statusCode: lmpaStatusCode,
  } = useLongMessageProvAll();
  const { data: activeProvData, isLoading: activeProvIsLoading } =
    useRoutingActiveProviders();
  const { data: networkLAllData, isLoading: networkLAllIsLoading } =
    useNetworkListAll();

  const queryClient = useQueryClient();
  const { mutate, statusCode } = useDeleteLongMessageProv(
    queryClient,
    setFeedback,
  );

  const handleOpenAdd = () => setIsModalOpen(true);

  const { handleOpenEdit, handleCloseEdit } = getPlmrHrefModal(
    setEditObj,
    setIsEdit,
    setIsModalOpen,
  );

  const handleDelete = (params) => {
    mutate(params);
  };

  return (
    <View style={styles.cont}>
      {lmpaIsLoading && <Loading />}
      {lmpaIsError && <FeedbackTwo statusCode={lmpaStatusCode} />}
      {!lmpaIsError && lmpaData && (
        <View style={styles.tableCont}>
          <PLMRTable
            panelHeading={"Long Message Providers"}
            data={lmpaData}
            columns={COLUMNS_PLMR}
            handleOpenAdd={handleOpenAdd}
            handleOpenEdit={handleOpenEdit}
            handleDelete={handleDelete}
            feedback={feedback}
            setFeedback={setFeedback}
            statusCode={statusCode}
          />
        </View>
      )}
      {isModalOpen && (
        <MuiDialogSlide
          component={
            <PLMRForm
              handleCloseEdit={handleCloseEdit}
              activeProvData={activeProvData}
              networkLAllData={networkLAllData}
              activeProvIsLoading={activeProvIsLoading}
              networkLAllIsLoading={networkLAllIsLoading}
              isEdit={isEdit}
              editObj={editObj}
            />
          }
          isModalOpen={isModalOpen}
          handleClose={handleCloseEdit}
        />
      )}
    </View>
  );
};

export default ProviderLongMessageRoutingScreen;
