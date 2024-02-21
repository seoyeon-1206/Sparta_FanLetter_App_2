import { Link, Outlet } from "react-router-dom"
import styled from "styled-components"

export default function Layout() {
    return (
        <>
            <Header>
                <Link to="/">Home</Link>
                <div>
                    <Link to="/profile">내 프로필</Link>
                    <Link>로그아웃</Link>
                </div>
            </Header>
            <Outlet />
        </>
    )
}

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 30px;
    height: 30px;
    background-color: gray;
    user-select: none; //사용자 드레그 막음
    & a { //link tag는 a 태그라서
        text-decoration: none;
        color: inherit;
        &:hover {
            color: white;
        }
    }
    & div a:nth-child(2) { //로그아웃 부분을 나타냄
        margin-left: 30px;
    }
`
