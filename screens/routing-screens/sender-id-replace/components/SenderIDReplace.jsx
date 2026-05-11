import FeedbackTwo from "@/components/feedback-two";
import Loading from "@/components/loading";
import MuiDialogSlide from "@/components/mui-dialogue-slide";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getSidrHrefModal } from "../constants/sidrHrefModal";
import { COLUMNS_SENDERIDR } from "../constants/sidrTHead";
import {
  useDeleteSenderIdReplace,
  useGetSenderIdReplace,
} from "../hooks/useSenderRId";
import SenderIDRTable from "./SenderIDRTable";
import SIDRForm from "./SIDRForm";

export default function SenderIDReplaceScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editObj, setEditObj] = useState(null);
  const [feedback, setFeedback] = useState({
    showStatus: null,
    showProgress: null,
  });

  const {
    data: sidrData,
    isLoading: sidrIsLoading,
    isError: sidrIsError,
    statusCode: sidrStatusCode,
  } = useGetSenderIdReplace();

  const queryClient = useQueryClient();
  const { mutate, statusCode } = useDeleteSenderIdReplace(
    queryClient,
    setFeedback,
  );

  const handleOpenAdd = () => setIsModalOpen(true);

  const { handleOpenEdit, handleCloseEdit } = getSidrHrefModal(
    setEditObj,
    setIsEdit,
    setIsModalOpen,
  );

  const handleDelete = (params) => {
    mutate(params);
  };

  return (
    <>
      {sidrIsLoading && <Loading />}
      {sidrIsError && <FeedbackTwo statusCode={sidrStatusCode} />}

      {!sidrIsError && !sidrIsLoading && (
        <SenderIDRTable
          panelHeading="Sender ID Replace"
          data={sidrData}
          columns={COLUMNS_SENDERIDR}
          handleOpenAdd={handleOpenAdd}
          handleOpenEdit={handleOpenEdit}
          handleDelete={handleDelete}
          feedback={feedback}
          setFeedback={setFeedback}
          statusCode={statusCode}
        />
      )}

      {isModalOpen && (
        <MuiDialogSlide
          component={
            <SIDRForm
              handleCloseEdit={handleCloseEdit}
              isEdit={isEdit}
              editObj={editObj}
            />
          }
          isModalOpen={isModalOpen}
          handleClose={handleCloseEdit}
        />
      )}
    </>
  );
}
