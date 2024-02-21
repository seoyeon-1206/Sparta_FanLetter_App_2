import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: !!localStorage.getItem("accessToken"), //!! Boolean 타입으로 강제 변환 시키는 연산자, localStorage 안에 문자열이 있으면 true 아니면 false
    avatar: localStorage.getItem("avatar"),
    nickname: localStorage.getItem("nickname"),
    userId: localStorage.getItem("userId"),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { accessToken, avatar, nickname, userId } = action.payload;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("avatar", avatar);
            localStorage.setItem("nickname", nickname);
            localStorage.setItem("userId", userId);
            state.isLogin = true;
            state.avatar = avatar;
            state.nickname = nickname;
            state.userId = userId;
        },
        logout: (state, aciton) => {
            state.isLogin = false;
            localStorage.clear();
        }

    }
})

export const { updateUserData, login, logout } = authSlice.actions;
export default authSlice.reducer;