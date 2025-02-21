import { HubConnection } from "@microsoft/signalr";
import { createSlice } from "@reduxjs/toolkit";

const messagehubSlice = createSlice({
    name: 'messagehub',
    initialState: {
        connection: null
    },
    reducers: {
        setConnection: (state, action) => {
            console.log(action.payload)
            state.connection = action.payload;
        }
    }

})

export const { setConnection } = messagehubSlice.actions;

export default messagehubSlice.reducer;
