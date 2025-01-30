/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { ConversationList } from "../types/conversationTypes";
import { fetchConversations } from "../service/message-service";
/* tslint:disable:no-unused-variable */
export const useMessage = () => {

  const [conversation, setConversation] = useState<ConversationList[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getConversations() {
    try {
      setIsLoading(true);
      const data = await fetchConversations();
      console.log("firt")
      setConversation(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    getConversations,
    isLoading,
    conversation,
  }
};
