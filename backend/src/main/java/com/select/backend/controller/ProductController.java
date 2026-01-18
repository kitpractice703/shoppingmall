package com.select.backend.controller;

import com.select.backend.domain.Mood;
import com.select.backend.domain.Product;
import com.select.backend.domain.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity; // 👈 이거 없으면 추가

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // React 접속 허용 (Vite 기본 포트)

public class ProductController {

    private final ProductRepository productRepository;

    // 1. 모든 상품 조회
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 2. 특정 무드(Mood) 상품만 조회 (핵심 기능)
    @GetMapping("/mood/{mood}")
    public List<Product> getProductsByMood(@PathVariable Mood mood) {
        return productRepository.findByMood(mood);
    }

    // 👇 [NEW] 3. 상품 상세 조회 (ID로 하나만 찾기)
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}