import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: {
        id: null,
        password: null,
        nickname: null,
        accessToken: null
    },
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            return { ...state, users: action.payload };
        },
        toggleLoginState: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        }
    }
})

export const { updateUserData, toggleLoginState } = authSlice.actions;
export default authSlice.reducer;