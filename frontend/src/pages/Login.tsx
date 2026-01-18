import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 0 20px;
  text-align: center;
`;

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

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Context에서 로그인 함수 가져오기
  const [formData, setFormData] = useState({ userId: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://3.34.137.196/api/members/login",
        formData,
      );

      // 로그인 성공 시 Context에 정보 저장
      login(response.data);
      alert(`${response.data.name}님 환영합니다!`);
      navigate("/"); // 메인으로 이동
    } catch (error) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h2 style={{ marginBottom: "30px" }}>LOGIN</h2>
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
          <Button type="submit">로그인</Button>
        </Form>
        <p
          style={{ marginTop: "20px", cursor: "pointer", color: "#888" }}
          onClick={() => navigate("/signup")}
        >
          아직 회원이 아니신가요? 회원가입
        </p>
      </Container>
    </>
  );
}
