export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  mood?: string;
}

// 장바구니 아이템(CartItem) 정의
// Product의 모든 정보(이름, 가격 등)를 상속받고 + 수량(quantity)을 추가함
export interface CartItem extends Product {
  quantity: number;
}
