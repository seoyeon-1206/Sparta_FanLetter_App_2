import Button from 'components/common/Button'
import Avatar from 'components/common/Avatar'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { avatar, nickname, userId } = useSelector(state => state.auth);

    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState("");


    return (
        <Container>
            <ProfileWrapper>
                <h1>프로필 관리</h1>
                <label>
                    <Avatar size="large" src={avatar} />
                    <input type='file' />
                </label>
                {isEditing ? <input autoFocus defaultValue={nickname} onChange={(e) => setEditingText(e.target.value)} /> :
                    <Nickname>{nickname}</Nickname>}
                <UserId>{userId}</UserId>
                {isEditing ? (<div>
                    <Button text='취소' onClick={() => setIsEditing(false)} />
                    <Button text='수정완료' />
                </div>
                ) : (
                    <Button text='수정하기' onClick={() => setIsEditing(true)} />
                )}
            </ProfileWrapper>
        </Container>
    )
}

export default Profile

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ProfileWrapper = styled.section`
    width: 500px;
    border-radius: 12px;
    background-color: lightgray;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    & h1 {
        font-size: 36px;
        font-weight: 700;
    }
    & div {
        display: flex;
        gap: 24px;
        padding: 6px 12px;
    }
    & input {
        height: 24px;
        outline: none;
    }
    & > label > input {
        display: none;
    }
`
const Nickname = styled.span`
    font-size: 24px;
    font-weight: 700;
`
const UserId = styled.span`
    font-size: 16px;
    color: gray;
`