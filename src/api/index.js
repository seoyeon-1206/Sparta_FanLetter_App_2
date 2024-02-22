import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../redux/modules/authSlice";

let store;
import('../redux/config/configStore').then(module => {
    store = module.default();
})

export const authApi = axios.create({
    baseURL: 'https://moneyfulpublicpolicy.co.kr',
    headers: {
        "Content-Type": "application/json" //json 서버가 데이터로 전송됐어를 서버에게 알려 줄 수 있다.(application/json: 기본값)
    }
})

export const jsonApi = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        "Content-Type": "application/json" //json 서버가 데이터로 전송됐어를 서버에게 알려 줄 수 있다.(application/json: 기본값)
    }
})

authApi.interceptors.request.use(
    config => {
        // 헤더에 토큰 넣기
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

jsonApi.interceptors.request.use(
    response => {
        return response;
    },
    error => {
        toast.error(error.response.data.message)
        if (error.response.data.message === "토큰이 만료되었습니다. 다시 로그인 해주세요.") {
            //로그아웃 처리
            return store.dispatch(logout());
        }
        return Promise.reject(error)
    }
)

jsonApi.interceptors.request.use(
    async config => {
        const { data } = await authApi.get('/user');
        if (data.success) return config;
    },
    error => {
        return Promise.reject(error)
    }
)