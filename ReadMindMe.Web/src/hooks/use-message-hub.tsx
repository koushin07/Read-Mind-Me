import {
  fechConversationById,
  fetchConversations,
} from "@/features/messages/service/message-service";
import {
  Conversation,
  ConversationList,
  Message,
} from "@/features/messages/types/conversationTypes";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useState, useEffect } from "react";

export const useMessageHub = () => {
  const token = localStorage.getItem("token");
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [conversations, setConversations] = useState<ConversationList[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [fetchedConversations, setFetchedConversation] =
    useState<Conversation | null>(null);

  const fetchById = (id: number) => {
    return fechConversationById(id).then((conversations) => {
      console.log("conversations");
      console.log(conversations);
      setFetchedConversation(conversations);
    });
  };

  const fetchAll = async () => {
    const response = await fetchConversations().then(
      (conversations) => conversations
    );
    setConversations(response);
    return response;
  };

  useEffect(() => {
    const connectToMessageHub = async () => {
      const connect = new HubConnectionBuilder()
        .withUrl("http://localhost:5081/hubs/messages", {
          accessTokenFactory: () => token!,
        })
        .withAutomaticReconnect()
        .build();

      try {
        await connect.start();
        console.log("Connected to MessageHub");
        connect.on("UpdateConversationList", (convoId: number, content: string) => {
          console.log(content)
          setConversations((prev) => {
            const index = prev.findIndex((c) => c.id === convoId);
            if (index === -1) return prev;

            // Update the conversation content
            const updatedConversation = { ...prev[index], content };

            // Remove the updated conversation from its original position
            const updatedConversations = [
              ...prev.slice(0, index),
              ...prev.slice(index + 1),
            ];

            // Add the updated conversation at the top of the list
            return [updatedConversation, ...updatedConversations];
          });
        });

        connect.on("MessageRecieved", (res) => {
          console.log(res+"res")
          setFetchedConversation((prev) => {
            if (!prev) return null;
            const newMessage = { content: res } as Message;
            return {
              ...prev,
              messages: [...prev.messages, newMessage],
            };
          });
          console.log(fetchedConversations)
        });
        setConnection(connect);
        setIsConnected(true);
      } catch (err) {
        console.error("Connection failed: ", err);
      }
    };

    connectToMessageHub();
  }, [token]);

  const JoinConversationGroup = async (conversationId: number) => {
    // if (!isConnected || !connection) {
    //   console.error("Connection is not established yet");
    //   return;
    // }

    try {
       await connection?.invoke(
        "JoinConversationGroup",
        conversationId
      );
      console.log("joinConversationGroup");
    } catch (err) {
      console.error(err!.toString());
      console.error("joinConversationGroup error");
    }
  };

  const sendMessage = async (
    conversationId: number,
    senderId: number,
    message: string
  ) => {
    if (!isConnected || !connection) {
      console.error("Connection is not established yet");
      return;
    }

    try {
      const res = await connection.invoke(
        "SendMessage",
        conversationId,
        senderId,
        message
      );
      console.log(res);
    } catch (err) {
      console.error(err!.toString());
    }
  };

  return {
    fetchAll,
    conversations,
    fetchedConversations,
    fetchById,
    connection,
    sendMessage,
    JoinConversationGroup,
  };
};
