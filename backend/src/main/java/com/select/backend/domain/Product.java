package com.select.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // 상품명
    private String description; // 상품 설명
    private int price;          // 가격
    private String imageUrl;    // 이미지 링크

    @Enumerated(EnumType.STRING)
    private Mood mood;          // 핵심: 상품의 감성 (6가지 중 하나)

    // 데이터를 쉽게 넣기 위한 생성자
    public Product(String name, String description, int price, String imageUrl, Mood mood) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.mood = mood;
    }
}