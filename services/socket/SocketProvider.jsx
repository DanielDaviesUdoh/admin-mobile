// SocketProvider.tsx
import { SOCKET_STATUS } from "@/constants/socketStatus";
import { createContext, useCallback, useRef, useState } from "react";
import { createStompClient } from "./socketManager";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const clientRef = useRef(null);
  const subscriptionsRef = useRef([]);
  const messageBufferRef = useRef([]);

  const [status, setStatus] = useState(SOCKET_STATUS.CONNECTING);

  const flushBuffer = useCallback(() => {
    if (!clientRef.current?.connected) return;

    messageBufferRef.current.forEach((msg) => {
      clientRef.current.publish(msg);
    });

    messageBufferRef.current = [];
  }, []);

  const connect = useCallback(() => {
    console.log("Trying to connect");
    if (clientRef.current?.active) return;

    const client = createStompClient();

    client.onConnect = () => {
      console.log("Connected");
      setStatus(SOCKET_STATUS.CONNECTED);
      flushBuffer();
    };

    client.onDisconnect = () => {
      console.log("Disconnected");
      setStatus(SOCKET_STATUS.DISCONNECTED);
    };

    client.onWebSocketClose = () => {
      console.log("Disconnected");
      setStatus(SOCKET_STATUS.DISCONNECTED);
    };

    client.onStompError = () => {
      console.log("Error");
      setStatus(SOCKET_STATUS.ERROR);
    };

    clientRef.current = client;
    setStatus(SOCKET_STATUS.CONNECTING);

    client.activate();
  }, [flushBuffer]);

  const disconnect = useCallback(async () => {
    if (!clientRef.current) return;

    subscriptionsRef.current.forEach((sub) => sub?.unsubscribe());
    subscriptionsRef.current = [];

    await clientRef.current.deactivate();

    clientRef.current = null;
    setStatus(SOCKET_STATUS.DISCONNECTED);
  }, []);

  const subscribe = useCallback((destination, callback) => {
    if (!clientRef.current?.connected) return;

    const sub = clientRef.current.subscribe(destination, callback);
    subscriptionsRef.current.push(sub);

    return () => sub.unsubscribe();
  }, []);

  const sendMessage = useCallback((destination, body) => {
    const message = {
      destination,
      body: JSON.stringify(body),
    };

    if (clientRef.current?.connected) {
      clientRef.current.publish(message);
    } else {
      messageBufferRef.current.push(message);
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{
        status,
        connect,
        disconnect,
        subscribe,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
