import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: {
        id: null,
        password: null,
        nickname: null,
        accessToken: null
    },
    isLogin: !!localStorage.getItem("accessToken"), //!! Boolean 타입으로 강제 변환 시키는 연산자, localStorage 안에 문자열이 있으면 true 아니면 false
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