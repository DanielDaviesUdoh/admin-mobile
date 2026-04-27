export const getHrefModal = (setModalState) => {
  const handleHref = (key) => (idOrText) => {
    setModalState((prev) => ({
      ...prev,
      [key]: { open: true, linkText: idOrText },
    }));
  };

  const closeModal = (key) => () => {
    setModalState((prev) => ({
      ...prev,
      [key]: { open: false, linkText: "" },
    }));
  };

  return {
    handleHref,
    closeModal,
  };
};
