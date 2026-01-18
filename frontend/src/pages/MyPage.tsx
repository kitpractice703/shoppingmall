import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 0 20px;
`;

const OrderBox = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #666;
  font-size: 0.9rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const OrderSummary = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const OrderPrice = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
`;

// 주문 데이터 타입 정의
interface OrderData {
  id: number;
  itemsSummary: string;
  totalPrice: number;
  orderDate: string;
}

export default function MyPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    // 1. 로그인을 안 했으면 접근 불가
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    // 2. 내 주문 내역 가져오기
    axios
      .get(`/api/orders/${user.userId}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("주문 조회 실패:", err));
  }, [user, navigate]);

  return (
    <>
      <Header />
      <Container>
        <h2 style={{ marginBottom: "30px" }}>MY ORDERS</h2>

        {orders.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "50px" }}>
            아직 주문 내역이 없습니다.
          </p>
        ) : (
          orders.map((order) => (
            <OrderBox key={order.id}>
              <OrderHeader>
                {/* 날짜 가공 (2026-01-18T10:00... -> 2026.01.18) */}
                <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                <span>주문번호: {order.id}</span>
              </OrderHeader>
              <OrderSummary>{order.itemsSummary}</OrderSummary>
              <OrderPrice>
                결제금액: {order.totalPrice.toLocaleString()}원
              </OrderPrice>
            </OrderBox>
          ))
        )}
      </Container>
    </>
  );
}
