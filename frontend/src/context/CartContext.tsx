import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "../types/common";

export interface CartItem extends Product {
  cartId: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (cartId: number) => void;
  clearCart: () => void; // 👈 1. 여기에 추가!
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const newItem = { ...product, cartId: Date.now() };
    setCart([...cart, newItem]);
    alert("장바구니에 담겼습니다!");
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  // 👇 2. 기능 구현 (빈 배열로 초기화)
  const clearCart = () => {
    setCart([]);
  };

  return (
    // 👇 3. value에 clearCart 추가
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
