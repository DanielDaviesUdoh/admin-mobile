export const getSidrHrefModal = (setEditObj, setIsEdit, setIsModalOpen) => {
  const handleOpenEdit = (clientId, senderId, provider, mccmnc, toSender) => {
    setEditObj({ clientId, senderId, provider, mccmnc, toSender });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleCloseEdit = () => {
    setEditObj(null);
    setIsEdit(false);
    setIsModalOpen(false);
  };

  return { handleOpenEdit, handleCloseEdit };
};
