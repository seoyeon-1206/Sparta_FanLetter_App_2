import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { buildQueries } from "@testing-library/react";
import { authApi } from "api";
import { toast } from "react-toastify";

const initialState = {
    isLogin: !!localStorage.getItem("accessToken"), //!! Boolean 타입으로 강제 변환 시키는 연산자, localStorage 안에 문자열이 있으면 true 아니면 false
    avatar: localStorage.getItem("avatar"),
    nickname: localStorage.getItem("nickname"),
    userId: localStorage.getItem("userId"),
    isLoading: false,
    isError: false,
    error: null
}

export const __login = createAsyncThunk("login", async ({ id, password }, thunkAPI) => {
    try {
        const { data } = await authApi.post("/login?expiresIn=10m", {
            id,
            password,
        }
        );
        const { accessToken, avatar, nickname, userId } = data;
        if (data.success) {
            toast.success("로그인 성공");
            return { accessToken, avatar, nickname, userId }
        }
    } catch (error) {
        toast.error(error.response.data.message)
        return thunkAPI.rejectWithValue(error);
    }

})

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

    },
    extraReducers: builder => {
        builder
            .addCase(__login.pending, (state, action) => {
                state.isLoading = true;

            })
            .addCase(__login.fulfilled, (state, action) => {
                const { accessToken, avatar, nickname, userId } = action.payload;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("avatar", avatar);
                localStorage.setItem("nickname", nickname);
                localStorage.setItem("userId", userId);
                state.isLogin = true;
                state.avatar = avatar;
                state.nickname = nickname;
                state.userId = userId;
                state.isLoading = false
            })
            .addCase(__login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})

export const { updateUserData, login, logout } = authSlice.actions;
export default authSlice.reducer;