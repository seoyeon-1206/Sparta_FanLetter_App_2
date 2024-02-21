import axios from "axios";

export const authApi = axios.create({
    baseURL: 'https://moneyfulpublicpolicy.co.kr',
    headers: {
        "Content-Type": "application/json" //json 서버가 데이터로 전송됐어를 서버에게 알려 줄 수 있다.(application/json: 기본값)
    }
})