import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useDispatch } from "react-redux";
import { addUserToOnline, removeUserFromOnline, setOnlineUser } from "@/shared/presenceSlice";
import { useState, useEffect } from 'react';

export const usePresence = (token: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null); // Initialize as null

  const dispatch = useDispatch();

  // Create the SignalR connection
  const createConnection = () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("/hubs/presence", {
        accessTokenFactory: () => token, // Add auth token if needed
      })
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("Connected to PresenceHub");
        setConnection(newConnection); // Set connection once successfully started
      })
      .catch((err) => console.error("SignalR Connection Error: ", err.message));

    newConnection.on("UserIsOnline", (userEmail: string) => {
      console.log("User is online " + userEmail);
      dispatch(addUserToOnline(userEmail));
    });

    newConnection.on("UserIsOffline", (userEmail: string) => {
      console.log("User is offline " + userEmail);
      dispatch(removeUserFromOnline(userEmail));
    });

    newConnection.on("GetOnlineUsers", (users: string[]) => {
      console.log("Current online users:", users);
      dispatch(setOnlineUser(users));
    });

    newConnection.onclose((error) => {
      console.log("SignalR connection closed", error);
    });
  };

  // Stop the SignalR connection
  const stopConnection = async () => {
    if (connection) {
      try {
        await connection.stop(); // Ensure connection exists before stopping
        console.log("Disconnected from PresenceHub");
        setConnection(null); // Reset connection state after disconnect
      } catch (err) {
        console.error("Error stopping SignalR connection: ", err);
      }
    } else {
      console.log("No active connection to disconnect from.");
    }
  };

  // Make sure to clean up connection when component unmounts
  useEffect(() => {
    return () => {
      if (connection) {
        connection.stop().catch((err) => {
          console.error("Error during cleanup stopping SignalR connection: ", err);
        });
      }
    };
  }, [connection]);

  return {
    createConnection,
    stopConnection,
  };
};
