import api from "@/services/api";

export const getHandleValidate = (
  ROUTING_NUMBERROUTING_VALIDATE,
  mobile,
  setValidate,
  setNumError,
  setShowProgress
) => {
  const handleValidate = async () => {
    setShowProgress(true)
    try {
      const res = await api.get(`${ROUTING_NUMBERROUTING_VALIDATE}${mobile}`);
      const data = res.data;
      const response = data.response;
      const hasRoute = response["has_bank_route"]
      if (hasRoute === "Y" || hasRoute === "N") {
        setValidate(true);
      }
    } catch (err) {
      setNumError(err.message);
      setTimeout(() => {
        setNumError(false);
      }, 3000);
    } finally {
      setShowProgress(false)
    }
  };

  return handleValidate;
};
