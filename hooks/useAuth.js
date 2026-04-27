import { AuthContext } from "@/context/auth-provider";
import { useContext } from "react";

export const useAuth = () => {
  const {
    auth,
    isLoading,
    login,
    logout,
    hasRequestedCode,
    setHasRequestedCode,
    hasShownLoginToast,
    setHasShownLoginToast,
  } = useContext(AuthContext);
  return {
    auth,
    isLoading,
    login,
    logout,
    hasRequestedCode,
    setHasRequestedCode,
    hasShownLoginToast,
    setHasShownLoginToast,
  };
};
