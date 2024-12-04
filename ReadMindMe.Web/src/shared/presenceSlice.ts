import { createSlice } from "@reduxjs/toolkit";



const initalState = {
    onlineUser: [] as string[]
}

const presenceSlice = createSlice({
    name: 'presence',
    initialState: initalState,
    reducers: {
        setOnlineUser: (state, action) => {

            state.onlineUser = action.payload;
        },
        addUserToOnline: (state, action) => {
            if (!state.onlineUser.includes(action.payload)) {
                state.onlineUser.push(action.payload); // Add only if not present
            }
        },
        removeUserFromOnline: (state, action) => {

            state.onlineUser = state.onlineUser.filter((user) => user!== action.payload.username);
        },
    },
})

export const { setOnlineUser, addUserToOnline, removeUserFromOnline } = presenceSlice.actions;
export default presenceSlice.reducer;
