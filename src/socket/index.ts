import { io } from "socket.io-client";

const options = {
  timeout: 10000,
  transports: ["websocket"],
  "force new connection": true,
  reconnectionAttempts: Infinity,
};

export const socket = io("https://localhost:3001", options);
