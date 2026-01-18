import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 0 20px;
`;

const CartItemBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 20px 0;
  gap: 20px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const RemoveButton = styled.button`
  background: #fff;
  border: 1px solid #ddd;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

const TotalPrice = styled.div`
  margin-top: 40px;
  text-align: right;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 20px;
  background-color: #000;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  margin-top: 30px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default function Cart() {
  // 👇 장바구니 비우기(clearCart) 기능은 잠시 후에 Context에 추가해야 합니다.
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  // [NEW] 주문하기 함수
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    // 로그인 체크: 로그인을 안 했으면 주문 못하게 막음
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    // 주문 요약 문구 만들기 (예: "니트 외 2건")
    const summary =
      cart.length === 1
        ? cart[0].name
        : `${cart[0].name} 외 ${cart.length - 1}건`;

    try {
      // 백엔드로 주문 전송
      await axios.post("http://localhost:8080/api/orders", {
        itemsSummary: summary,
        totalPrice: totalPrice,
        memberId: user.userId, // 내 아이디를 같이 보냄
      });

      alert("주문이 완료되었습니다!");

      clearCart();
      navigate("/");

      // 여기서 장바구니를 비워야 하는데, 일단은 새로고침으로 대체합니다.
      // (완벽한 구현을 위해 다음 단계에서 clearCart를 만들겠습니다)
      window.location.href = "/";
    } catch (error) {
      console.error("주문 실패:", error);
      alert("주문 처리에 실패했습니다.");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h2>SHOPPING CART ({cart.length})</h2>

        {cart.length === 0 ? (
          <p style={{ marginTop: "50px", textAlign: "center" }}>
            장바구니가 비어있습니다.
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <CartItemBox key={item.cartId}>
                <img src={item.imageUrl} alt={item.name} />
                <Info>
                  <h3>{item.name}</h3>
                  <p>{item.price.toLocaleString()}원</p>
                </Info>
                <RemoveButton onClick={() => removeFromCart(item.cartId)}>
                  삭제
                </RemoveButton>
              </CartItemBox>
            ))}

            <TotalPrice>Total: {totalPrice.toLocaleString()}원</TotalPrice>

            {/* 주문 버튼 추가 */}
            <CheckoutButton onClick={handleCheckout}>ORDER NOW</CheckoutButton>
          </>
        )}
      </Container>
    </>
  );
}
