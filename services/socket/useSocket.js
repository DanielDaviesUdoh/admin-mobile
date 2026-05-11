import { useContext } from "react";
import { SocketContext } from "./SocketProvider";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used inside SocketProvider");
  }
  const { status, connect, disconnect, subscribe, sendMessage } = context;

  return {
    status,
    connect,
    disconnect,
    subscribe,
    sendMessage,
  };
};
