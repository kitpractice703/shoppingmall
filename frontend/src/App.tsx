import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyles";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContext"; // 👈
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            {/* 기본 주소(/)로 오면 Home을 보여줘 */}
            <Route path="/" element={<Home />} />
            {/* /product/1 같은 주소로 오면 Detail을 보여줘 */}
            <Route path="/product/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />{" "}
            {/* 👈 장바구니 페이지 경로 추가 */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
