import { ConfirmDialogContext } from "@/context/confirm-dialogue-provider";
import { useContext } from "react";

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);

  if (!context) {
    throw new Error(
      "useConfirmDialog must be used within ConfirmDialogProvider",
    );
  }

  const { confirmDialog } = context;

  return { confirmDialog };
};
