import React from 'react'
import styled from 'styled-components'

const Login = () => {
    return (
        <>
            <LoginWrapper>
                <LoginForm>
                    <PageTitle>로그인</PageTitle>
                    <InputWrapper>
                        <input name='id' placeholder='아이디 (4~10글자)' minLength="4" maxLength="10"></input>
                    </InputWrapper>
                    <InputWrapper>
                        <input name='password' placeholder='비밀번호 (4~15글자)' minLength="4" maxLength="15"></input>
                    </InputWrapper>
                    <TopBtn>
                        <button>로그인</button>
                    </TopBtn>
                    <BottomBtn>
                        <span>회원가입</span>
                    </BottomBtn>
                </LoginForm>
            </LoginWrapper>
        </>
    )
}

export default Login

export const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: lightgray;
`
export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 12px 18px;
    border-radius: 12px;
    background-color: white;
    width: 500px;
`
export const PageTitle = styled.h1`
font-size: 36px;
    margin-bottom: 36px;
    
`
export const InputWrapper = styled.div`
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
export const TopBtn = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & button {
    background-color: lightgray;
    color: white;
    cursor: pointer;
    width: 100%;
    font-size: 20px;
    padding: 24px 36px;
    border: none;
    }
`
export const BottomBtn = styled.form`
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
