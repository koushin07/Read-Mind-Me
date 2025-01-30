import { User } from "@/features/user/types/user";

export interface Message {
    id: number;
    sender: User;
    content: string;
    conversation: Conversation;
    conversationId: number;
    readAt: string | null;
    createAt: string;

}

export interface Participant{
    id: number
    name: string;
    user: User;
    userId: number;
    conversation: Conversation;
    conversationId: number;
    createAt: string;
}

export interface Conversation {
    id: number;
    participants: Participant[];
    messages: Message[];
    createAt: string;
}


export interface ConversationList {
    id: number;
    userName: string;
    content: string;
    avatar: string;
    unreadCount: number;


}

export interface createConversation {
    creatorId: number
    participantsId: number[]
}
