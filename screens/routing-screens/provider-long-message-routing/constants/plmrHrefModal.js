export const getPlmrHrefModal = (setEditObj, setIsEdit, setIsModalOpen) => {
  const handleOpenEdit = (
    provider,
    over_160_char_provider,
    mccmnc,
    msg_len,
  ) => {
    setEditObj({ provider, over_160_char_provider, mccmnc, msg_len });
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
