import ConfirmDialog from "@/components/confirm-dialogue";
import { createContext, useCallback, useState } from "react";

export const ConfirmDialogContext = createContext(null);

export const ConfirmDialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({});
  const [resolver, setResolver] = useState(null);

  const confirmDialog = useCallback((options) => {
    setOptions(options);
    setOpen(true);

    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const handleConfirm = () => {
    if (resolver) resolver(true);
    setOpen(false);
  };

  const handleCancel = () => {
    if (resolver) resolver(false);
    setOpen(false);
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirmDialog }}>
      {children}

      <ConfirmDialog
        open={open}
        title={options.title}
        message={options.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmDialogContext.Provider>
  );
};
