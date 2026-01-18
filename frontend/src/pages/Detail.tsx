import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 주소창 ID 가져오기 & 페이지 이동
import axios from "axios";
import styled from "styled-components";
import type { Product } from "../types/common";
import { useCart } from "../context/CartContext";

const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  padding: 0 20px;
  display: flex;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  img {
    width: 100%;
    border-radius: 4px;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductName = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 40px;
`;

const BackButton = styled.button`
  padding: 15px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.8;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const CartButton = styled.button`
  flex: 1;
  padding: 15px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;

export default function Detail() {
  const { id } = useParams(); // 주소창의 /product/1 에서 '1'을 가져옴
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // 백엔드에서 ID로 상품 1개만 가져오기
    axios
      .get<Product>(`http://3.34.137.196/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <ImageSection>
        <img src={product.imageUrl} alt={product.name} />
      </ImageSection>
      <InfoSection>
        <ProductName>{product.name}</ProductName>
        <Price>{product.price.toLocaleString()}원</Price>
        <Description>{product.description}</Description>
        <ActionButtons>
          <CartButton onClick={() => addToCart(product)}>CART IN</CartButton>
          <BackButton onClick={() => navigate(-1)}>BACK</BackButton>
        </ActionButtons>
      </InfoSection>
    </Container>
  );
}
