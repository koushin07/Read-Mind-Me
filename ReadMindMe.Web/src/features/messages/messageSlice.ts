import { createSlice } from "@reduxjs/toolkit";

import { ConversationList } from "./types/conversationTypes";


const initialState: ConversationList[] = []

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {

        loadConversation: (state, action) => {
              state.push(action.payload);
         }
    },

})

export const { loadConversation } = messageSlice.actions;
export default messageSlice.reducer;
