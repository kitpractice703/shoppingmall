import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../styles/GlobalStyles";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 40px;
  padding-top: 50px;
  position: relative;

  @media ${device.mobile} {
    padding-top: 30px;
    margin-bottom: 30px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: -1px;
  margin-bottom: 10px;

  @media ${device.mobile} {
    font-size: 2rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1rem;
  color: #666;
  font-weight: 400;
`;

const AuthNav = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  gap: 20px; // 간격을 좀 더 넓게 줌
  align-items: center;

  @media ${device.mobile} {
    top: 15px;
    right: 15px;
    gap: 10px;
  }
`;

const NavLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: #000;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media ${device.mobile} {
    font-size: 0.75rem; // 모바일에서 글씨 크기 조절
  }
`;

// 이름 표시용 스타일 (클릭 안 됨, 회색조)
const WelcomeMsg = styled.span`
  font-size: 0.9rem;
  color: #888;
  margin-right: -10px; // 메뉴와의 간격 조절

  @media ${device.mobile} {
    display: none; // 모바일에서는 공간 부족하면 이름 숨기기 (선택사항)
  }
`;

export default function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <HeaderContainer>
      <Title>select.</Title>
      <SubTitle>Less choice, Better taste.</SubTitle>

      <AuthNav>
        {user ? (
          // [로그인 상태]
          <>
            {/* 1. 환영 문구 (클릭 X) */}
            <WelcomeMsg>{user.name}님</WelcomeMsg>

            {/* 2. 마이페이지 링크 (클릭 O) */}
            <NavLink to="/mypage">MY PAGE</NavLink>

            {/* 3. 로그아웃 버튼 */}
            <NavLink as="button" onClick={logout}>
              LOGOUT
            </NavLink>
          </>
        ) : (
          // [비로그인 상태]
          <>
            <NavLink to="/login">LOGIN</NavLink>
            <NavLink to="/signup">SIGN UP</NavLink>
          </>
        )}

        {/* 4. 장바구니 (항상 보임) */}
        <NavLink to="/cart">CART ({cart.length})</NavLink>
      </AuthNav>
    </HeaderContainer>
  );
}
