import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import MoodSelector from "../components/MoodSelector";
import ProductList from "../components/ProductList";
import type { Product } from "../types/common"; // common.ts로 바꿨었죠?

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("ALL");

  const fetchProducts = async (mood: string) => {
    try {
      const url =
        mood === "ALL"
          ? "http://localhost:8080/api/products"
          : `http://localhost:8080/api/products/mood/${mood}`;

      const response = await axios.get<Product[]>(url);
      setProducts(response.data);
    } catch (error) {
      console.error("통신 에러:", error);
    }
  };

  useEffect(() => {
    fetchProducts("ALL");
  }, []);

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
    fetchProducts(mood);
  };

  return (
    <>
      <Header />
      <MoodSelector selectedMood={selectedMood} onMoodClick={handleMoodClick} />
      <ProductList products={products} />
    </>
  );
}
