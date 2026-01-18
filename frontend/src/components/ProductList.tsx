import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { Product } from "../types/product";
import { device } from "../styles/GlobalStyles";

const Grid = styled.div`
  display: grid;
  // 데스크탑: 한 줄에 3개 (기본)
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;

  // 태블릿: 한 줄에 2개
  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  // 모바일: 한 줄에 1개
  @media ${device.mobile} {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover img {
    opacity: 0.9;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4; // 세로로 긴 패션 화보 비율 유지
  background-color: #f4f4f4;
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: 4px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05); // 마우스 올리면 살짝 확대
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
`;

const Desc = styled.p`
  font-size: 0.9rem;
  color: #888;
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 8px;
`;
interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const navigate = useNavigate(); // 이동을 도와주는 훅(Hook)

  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        등록된 상품이 없습니다.
      </div>
    );
  }

  return (
    <Grid>
      {products.map((product) => (
        <Card
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)} // 👈 클릭하면 이동!
        >
          <ImageWrapper>
            <img src={product.imageUrl} alt={product.name} />
          </ImageWrapper>
          <Info>
            <Name>{product.name}</Name>
            <Desc>{product.description}</Desc>
            <Price>{product.price.toLocaleString()}원</Price>
          </Info>
        </Card>
      ))}
    </Grid>
  );
}
