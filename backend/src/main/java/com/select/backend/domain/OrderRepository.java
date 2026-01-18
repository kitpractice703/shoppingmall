package com.select.backend.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    // memberId로 주문 목록 찾기 (최신순 정렬: OrderByOrderDateDesc)
    List<Orders> findByMemberIdOrderByOrderDateDesc(String memberId);
}