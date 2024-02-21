import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { registorUser } from 'actions/authActions';
import { toggleLoginState } from '../redux/modules/authSlice';

const Login = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        id: '',
        password: '',
        nickname: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registorUser(userData));
        if (!isLoggedIn) {
            dispatch(toggleLoginState());
        }
    };

    const toggleForm = () => {
        dispatch(toggleLoginState());
    }
    return (
        <>
            <LoginWrapper>
                <LoginForm onSubmit={handleSubmit}>
                    <PageTitle>{isLoggedIn ? '로그인' : '회원가입'}</PageTitle>
                    <InputWrapper>
                        <input
                            type='text'
                            name='id'
                            placeholder='아이디 (4~10글자)'
                            minLength="4"
                            maxLength="10"
                            value={userData.id}
                            onChange={handleChange}>
                        </input>
                    </InputWrapper>
                    <InputWrapper>
                        <input
                            type='password'
                            name='password'
                            placeholder='비밀번호 (4~15글자)'
                            minLength="4"
                            maxLength="15"
                            value={userData.password}
                            onChange={handleChange}>
                        </input>
                    </InputWrapper>
                    {!isLoggedIn && (
                        <InputWrapper>
                            <input
                                type='text'
                                name='nickname'
                                placeholder='닉네임 (1~10글자)'
                                minLength="1"
                                maxLength="10"
                                value={userData.nickname}
                                onChange={handleChange}>
                            </input>
                        </InputWrapper>
                    )}
                    <TopBtn>
                        <button type='submit'>{isLoggedIn ? '로그인' : '회원가입'} </button>
                    </TopBtn>
                    <BottomBtn>
                        <span onClick={toggleForm}>{isLoggedIn ? '회원가입' : '로그인'}</span>
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
    background-color: lightgray;
    color: white;
    cursor: pointer;
    width: 100%;
    font-size: 20px;
    padding: 24px 36px;
    border: none;
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
