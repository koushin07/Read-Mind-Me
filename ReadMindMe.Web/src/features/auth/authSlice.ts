import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types/authType";
import { User } from "../user/types/user";


const initialState: AuthState = {
    user: {} as User,
    token: '',
    error: '',
    isLoggedin: false,

}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;

        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLogin: (state, action) => {
            state.isLoggedin = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = '';
        },
        setLogout: (state) => {
            state.isLoggedin = false;
            state.user = {} as User;
            state.token = '';

        }
    },
})

export const { setUser, setToken, setError, setLogin, setLogout} = authSlice.actions;
export default authSlice.reducer;
