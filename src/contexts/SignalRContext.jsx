import React, { createContext, useContext } from "react";
import * as signalR from "@microsoft/signalr";
import { handleCardMovedEvent } from "../services/cardService";

const SignalRContext = createContext();

export function useSignalR() {
  return useContext(SignalRContext);
}

const connection = new signalR.HubConnectionBuilder()
  .withUrl(import.meta.env.VITE_HUBS_BOARD_URL, {
    withCredentials: false,
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
  })
  .configureLogging(signalR.LogLevel.Information)
  .build();

async function connect() {
  try {
    await connection.start();
  } catch (err) {
    console.error(err);
    setTimeout(() => connect(), 5000);
  }
}

connection.on("ReceiveCardMovedEvent", (notification) => {
  handleCardMovedEvent(notification);
});

connect();

export default function SignalRProvider({ children }) {
  function invoke(action, body) {
    connection.invoke(action, body);
  }

  async function send(action, body) {
    return await connection.send(action, body);
  }

  return (
    <SignalRContext.Provider value={{ invoke, send }}>
      {children}
    </SignalRContext.Provider>
  );
}
