package com.select.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Orders {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemsSummary; // 주문 상품 요약
    private int totalPrice;      // 총 금액
    private LocalDateTime orderDate;

    // 👇 [추가] 누가 샀는지 저장 (회원의 고유 ID인 userId를 저장)
    private String memberId;

    // 생성자에도 memberId 추가
    public Orders(String itemsSummary, int totalPrice, String memberId) {
        this.itemsSummary = itemsSummary;
        this.totalPrice = totalPrice;
        this.memberId = memberId; // 저장
        this.orderDate = LocalDateTime.now();
    }
}