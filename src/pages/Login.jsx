import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleLoginState } from '../redux/modules/authSlice';
import styled, { css } from 'styled-components'
import { toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const initialState = {
        id: '', password: '', nickname: ''
    }
    const [formState, setFormState] = useState(initialState);
    const { id, password, nickname } = formState;
    console.log(id, password, nickname)

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormState(prev => ({ ...prev, [name]: value }))
    }

    const isRegisterButtonDisabled = () => {
        return isLoginMode ? id.trim() === '' || password.trim() === '' : id.trim() === '' || password.trim() === '' || nickname.trim() === '';
    }

    // 로그인, 회원가입 제출 버튼
    const onSubmitHandler = (event) => {
        event.preventDefault(); //submit이라서
        if (isLoginMode) {
            //로그인 모드 처리
            dispatch(toggleLoginState());
            toast.success("로그인 성공")
        } else {
            //회원가입 처리 
            setIsLoginMode(true);
            setFormState(initialState)
            toast.success("회원가입 성공")
        }
    }

    return (
        <>
            <LoginWrapper>
                <LoginForm onSubmit={onSubmitHandler}>
                    <PageTitle>{isLoginMode ? '로그인' : '회원가입'}</PageTitle>
                    <InputWrapper>
                        <input
                            type='text'
                            name='id'
                            placeholder='아이디 (4~10글자)'
                            minLength="4"
                            maxLength="10"
                            value={id}
                            onChange={onChangeHandler}>
                        </input>
                    </InputWrapper>
                    <InputWrapper>
                        <input
                            type='password'
                            name='password'
                            placeholder='비밀번호 (4~15글자)'
                            minLength="4"
                            maxLength="15"
                            value={password}
                            onChange={onChangeHandler}>
                        </input>
                    </InputWrapper>
                    {!isLoginMode && (
                        <InputWrapper>
                            <input
                                type='text'
                                name='nickname'
                                placeholder='닉네임 (1~10글자)'
                                minLength="1"
                                maxLength="10"
                                value={nickname}
                                onChange={onChangeHandler}>
                            </input>
                        </InputWrapper>
                    )}
                    <TopBtn>
                        <button disabled={isRegisterButtonDisabled()} type='submit'>{isLoginMode ? '로그인' : '회원가입'} </button>
                    </TopBtn>
                    <BottomBtn>
                        <span onClick={() => { setIsLoginMode(prev => !prev) }}>{isLoginMode ? '회원가입' : '로그인'}</span>
                    </BottomBtn>
                </LoginForm>
            </LoginWrapper>
        </>
    )
}

export default Login

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: lightgray;
`
const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 12px 18px;
    border-radius: 12px;
    background-color: white;
    width: 500px;
`
const PageTitle = styled.h1`
font-size: 36px;
    margin-bottom: 36px;
    
`
const InputWrapper = styled.div`
    margin-bottom: 24px;
    padding: 12px 0px;
    border-top: none;
    border-right: none;
    border-left: none;
    border-image: initial;
    border-bottom: 1px solid gray;
    outline: none;

    & input {
    border: none;
    width: 100%;
    outline: none;
    }
`
const TopBtn = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & button {
        background-color: black;
    color: white;
    cursor: pointer;
    width: 100%;
    font-size: 20px;
    padding: 24px 36px;
    border: none;

    &:disabled {
        background-color: lightgray;
    }
    }
`
const BottomBtn = styled.form`
text-align: center;
    font-size: 16px;
    color: lightgray;
    margin-top: 24px;

    & span {
        margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
    user-select: none;
    cursor: pointer;
    }

    & span:hover {
        color: black; 
    }
    
`
