import axios from "axios"

export const registorUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('https://moneyfulpublicpolicy.co.kr/register', userData
            );
            console.log(response.data)
            dispatch(registerSuccess())
        } catch (error) {
            console.log('회원가입 오류', error)
            dispatch(registerFailure(error.message))

        }
    }
}

const registerSuccess = () => ({
    type: 'REGISTER_SUCCESS',
});

const registerFailure = (error) => ({
    type: 'REGISTER_SUCCESS',
    Payload: error,
});

