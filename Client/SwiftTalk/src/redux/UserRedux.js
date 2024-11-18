import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_id: '',
    username: '',
    userEmail: '',
    PhotoUrl: '',
    token: '',
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
        setToken: (state, action) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.user_id = ''
            state.username = ''
            state.PhotoUrl = ''
            state.userEmail = ''
            state.token = ''
        }
    },
});
export const { addUser, logout, setToken } = userState.actions;
export default userState.reducer;