// src/components/MoodSelector.tsx
import styled from "styled-components";
import { device } from "../styles/GlobalStyles";

interface Props {
  selectedMood: string;
  onMoodClick: (mood: string) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 50px;
  flex-wrap: wrap; // 모바일에서 줄바꿈 허용

  @media ${device.mobile} {
    gap: 8px;
    padding: 0 10px;
  }
`;

const Button = styled.button<{ $active: boolean }>`
  padding: 10px 24px;
  border: 1px solid #e0e0e0;
  background: ${(props) => (props.$active ? "#000" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#000")};
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.2s ease;

  &:hover {
    background: #000;
    color: #fff;
    border-color: #000;
  }

  // 모바일에서는 버튼 크기를 조금 줄임
  @media ${device.mobile} {
    padding: 8px 16px;
    font-size: 0.8rem;
  }
`;

const moods = ["MINIMAL", "COZY", "LOVELY", "VINTAGE", "CLASSIC", "STREET"];

export default function MoodSelector({ selectedMood, onMoodClick }: Props) {
  return (
    <Container>
      <Button
        $active={selectedMood === "ALL"}
        onClick={() => onMoodClick("ALL")}
      >
        ALL
      </Button>
      {moods.map((mood) => (
        <Button
          key={mood}
          $active={selectedMood === mood}
          onClick={() => onMoodClick(mood)}
        >
          {mood}
        </Button>
      ))}
    </Container>
  );
}
