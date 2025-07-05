import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_id: '',
    username: '',
    userEmail: '',
    PhotoUrl: '',
    token: '',
    Theme:'light',
    OnlineUser: [],
    SocketConnection: null,
}
export const userState = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user_id = action.payload._id
            state.username = action.payload.name
            state.userEmail = action.payload.email
            state.PhotoUrl = action.payload.photoUrl

        },
        setTheme:(state,action)=>{
state.Theme=action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.user_id = ''
            state.username = ''
            state.PhotoUrl = ''
            state.userEmail = ''
            state.token = ''
        },
        setOnlineUser: (state, action) => {
            state.OnlineUser = action.payload
        },
        SocketConnection: (state, action) => {
            state.SocketConnection = action.payload
        }

    },
});
export const { setTheme,addUser, logout, setToken, setOnlineUser,SocketConnection } = userState.actions;
export default userState.reducer;