package com.select.backend.controller;

import com.select.backend.domain.Orders;
import com.select.backend.domain.OrderRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;

    // 주문 요청을 받을 때 사용할 데이터 형태 (DTO)
    @Data
    static class OrderRequest {
        private String itemsSummary;
        private int totalPrice;
        private String memberId;
    }

    // 주문 저장 API
    @PostMapping
    public Orders createOrder(@RequestBody OrderRequest request) {
        Orders newOrder = new Orders(
                request.itemsSummary,
                request.totalPrice,
                request.getMemberId()
        );
        return orderRepository.save(newOrder);
    }

    @GetMapping("/{memberId}")
    public List<Orders> getMyOrders(@PathVariable String memberId) {
        return orderRepository.findByMemberIdOrderByOrderDateDesc(memberId);
    }
}