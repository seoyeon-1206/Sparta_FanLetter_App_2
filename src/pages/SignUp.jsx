import React from 'react'
import { BottomBtn, InputWrapper, LoginForm, LoginWrapper, PageTitle, TopBtn } from './Login'

const SignUp = () => {
    return (
        <>
            <LoginWrapper>
                <LoginForm>
                    <PageTitle>회원가입</PageTitle>
                    <InputWrapper>
                        <input name='id' placeholder='아이디 (4~10글자)' minLength="4" maxLength="10"></input>
                    </InputWrapper>
                    <InputWrapper>
                        <input name='password' placeholder='비밀번호 (4~15글자)' minLength="4" maxLength="15"></input>
                    </InputWrapper>
                    <InputWrapper>
                        <input name='nickname' placeholder='닉네임 (1~10글자)' minLength="1" maxLength="10"></input>
                    </InputWrapper>
                    <TopBtn>
                        <button>회원가입</button>
                    </TopBtn>
                    <BottomBtn>
                        <span>로그인</span>
                    </BottomBtn>

                </LoginForm>

            </LoginWrapper>
        </>
    )
}

export default SignUp