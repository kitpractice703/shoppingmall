import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 0 20px;
  text-align: center;
`;

// form 태그로 스타일 변경
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    opacity: 0.9;
  }
`;

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // [수정] FormEvent 타입을 사용하고, e.preventDefault() 추가
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 엔터 쳤을 때 새로고침 되는 것 방지 (필수!)

    if (!formData.userId || !formData.password || !formData.name) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    try {
      await axios.post("/api/members/register", formData);
      alert("회원가입 성공! 환영합니다.");
      navigate("/");
    } catch (error: any) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h2 style={{ marginBottom: "30px" }}>SIGN UP</h2>
        {/* 👇 div 대신 form을 쓰고 onSubmit에 함수 연결 */}
        <Form onSubmit={handleSubmit}>
          <Input
            name="userId"
            placeholder="아이디"
            value={formData.userId}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="이메일 (선택)"
            value={formData.email}
            onChange={handleChange}
          />
          {/* 👇 onClick을 제거하고 type="submit"으로 변경 */}
          <Button type="submit">가입하기</Button>
        </Form>
      </Container>
    </>
  );
}
