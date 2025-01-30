import api from "@/utils/axiosConfig"
import { Conversation, ConversationList, createConversation } from "../types/conversationTypes"

export const fetchConversations = async (): Promise<ConversationList[]> => {
    return api.get<ConversationList[]>("/Conversation").then(response => response.data);
}

export const postConversation = async (data: createConversation): Promise<number> => {
    return api.post<number>("/Conversation", data).then(response => response.data);
}


export const fechConversationById = async (id: number): Promise<Conversation> => {
    const response = await api.get<Conversation>("/Conversation/" + id).then(response => response.data)
    console.log(response)
    return response
}

