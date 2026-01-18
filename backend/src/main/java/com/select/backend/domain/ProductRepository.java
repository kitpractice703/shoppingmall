package com.select.backend.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // 특정 무드(Mood)를 가진 상품만 찾아오는 기능 자동 생성
    List<Product> findByMood(Mood mood);
}