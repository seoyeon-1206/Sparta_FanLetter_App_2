import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: {
        id: null,
        password: null,
        nickname: null,
        accessToken: null
    },
    isLogin: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const accessToken = action.payload;
            localStorage.setItem("accessToken", accessToken);
            state.isLogin = true;
        },
        logout: (state, aciton) => {
            state.isLogin = false;
            localStorage.clear();
        }

    }
})

export const { updateUserData, login, logout } = authSlice.actions;
export default authSlice.reducer;