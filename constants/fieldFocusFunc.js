export const getHandleSelectFocus = (setSelectedRadioBtn) => {
  const handleSelectFocus = (activeRadioBtn, setFocused, disabled) => {
    if (disabled) return;
    setFocused(true);
    setSelectedRadioBtn(activeRadioBtn);
  };

  return handleSelectFocus;
};

export const getHandleTextFocus = (setSelectedRadioBtn) => {
  const handleTextFocus = (activeRadioBtn) => {
    setSelectedRadioBtn(activeRadioBtn);
  };

  return handleTextFocus;
};
