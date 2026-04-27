import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { useSlide } from "./useSlide";
import useStaff from "./useStaff";

export const useLogout = () => {
  const { logout, setHasRequestedCode, setHasShownLoginToast } = useAuth();
  const { setStaff } = useStaff();
  const { closeSidebar } = useSlide();

  const handleLogout = useCallback(async () => {
    await logout();
    setHasShownLoginToast(false);
    setStaff({});
    closeSidebar();
    setHasRequestedCode(false);
  }, [
    logout,
    setHasRequestedCode,
    setHasShownLoginToast,
    setStaff,
    closeSidebar,
  ]);

  return handleLogout;
};
