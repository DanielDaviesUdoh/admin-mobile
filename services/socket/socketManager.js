// socketManager.js
import { Client } from "@stomp/stompjs";
import { BASE_URL } from "../api";

const getWsUrl = () => {
  return (
    BASE_URL.replace(/^https/, "wss").replace(/^http/, "ws") +
    "/ws/queue-native"
  );
};

export const createStompClient = () => {
  return new Client({
    webSocketFactory: () => new WebSocket(getWsUrl(), []),
    forceBinaryWSFrames: true,
    appendMissingNULLonIncoming: true,
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,

    debug: (str) => console.log("STOMP:", str),
  });
};
