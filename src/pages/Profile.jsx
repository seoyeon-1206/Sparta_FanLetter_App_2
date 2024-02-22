import Button from 'components/common/Button'
import Avatar from 'components/common/Avatar'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { __editProfile } from '../redux/modules/authSlice'

const Profile = () => {
    const dispatch = useDispatch();
    const { avatar, nickname, userId } = useSelector(state => state.auth);

    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState("");
    const [selectedImg, setSelectedImg] = useState(avatar);
    const [file, setFile] = useState(null);

    const previewImg = (event) => {
        const imgFile = event.target.files[0];
        if (imgFile.size > 1024 * 1024) { //1mb 이상
            return toast.warn("최대 1MB까지 업로드 가능합니다.")
        }
        setFile(imgFile)
        //프리뷰 구현
        // file -> url 형식으로 변환
        const imgUrl = URL.createObjectURL(imgFile);
        setSelectedImg(imgUrl)
    }

    const onEditDone = () => {
        // api 요청, UI 변경 => thunk 사용
        const formData = new FormData();
        if (editingText) {
            formData.append("nickname", editingText)
        }
        if (selectedImg !== avatar) {
            formData.append("avarta", file)
        }
        dispatch(__editProfile(formData))
        setIsEditing(false);
        toast.success("프로필 수정이 완료 되었습니다!")
    }

    return (
        <Container>
            <ProfileWrapper>
                <h1>프로필 관리</h1>
                <label>
                    <Avatar size="large" src={selectedImg} />
                    <input type='file' onChange={previewImg} accept="image/*" />
                </label>
                {isEditing ? <input autoFocus defaultValue={nickname} onChange={(e) => setEditingText(e.target.value)} /> :
                    <Nickname>{nickname}</Nickname>}
                <UserId>{userId}</UserId>
                {isEditing ? (<div>
                    <Button text='취소' onClick={() => setIsEditing(false)} />
                    <Button onClick={onEditDone} text='수정완료' disabled={!editingText && selectedImg === avatar} />
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
        display: none; //input 안보이게
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