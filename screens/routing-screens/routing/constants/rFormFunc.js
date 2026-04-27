export const getDisableFetchBtn = (
  selectedRadioBtn,
  fieldCountryCode,
  fieldPhoneOrPrefix,
  fieldProvider,
) => {
  const disableFetchBtn = () => {
    if (!selectedRadioBtn) return true;
    if (selectedRadioBtn === "country code" && !fieldCountryCode.trim())
      return true;
    if (
      selectedRadioBtn === "phone number or prefix" &&
      !fieldPhoneOrPrefix.trim()
    )
      return true;
    if (
      selectedRadioBtn === "provider" &&
      (!fieldProvider || fieldProvider === "select")
    )
      return true;
    return false;
  };

  return disableFetchBtn;
};

export const getHandleSubmit = (
  setEndpoint,
  setPanelHeading,
  setSelectedFCtryCode,
  setQKey,
  selectedRadioBtn,
  fieldCountryCode,
  fieldPhoneOrPrefix,
  fieldProvider,
  setFetchTrigger,
  ROUTING_BY_COUNTRY,
  ROUTING_BY_PREFIX,
  ROUTING_BY_PROVIDER,
) => {
  const handleSubmit = () => {
    if (selectedRadioBtn === "country code") {
      setEndpoint(`${ROUTING_BY_COUNTRY}${fieldCountryCode}`);
      setPanelHeading(selectedRadioBtn);
      setSelectedFCtryCode(fieldCountryCode);
      setQKey(fieldCountryCode);
    } else if (selectedRadioBtn === "phone number or prefix") {
      setEndpoint(`${ROUTING_BY_PREFIX}${fieldPhoneOrPrefix}`);
      setPanelHeading(selectedRadioBtn);
      setQKey(fieldPhoneOrPrefix);
    } else if (selectedRadioBtn === "provider") {
      setEndpoint(`${ROUTING_BY_PROVIDER}${fieldProvider}`);
      setPanelHeading(selectedRadioBtn);
      setQKey(fieldProvider);
    }
    setFetchTrigger(true);
  };

  return handleSubmit;
};
