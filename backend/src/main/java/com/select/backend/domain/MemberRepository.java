package com.select.backend.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    // 중복 아이디 체크를 위해 "userId가 존재하는지?" 묻는 기능 추가
    boolean existsByUserId(String userId);
    Member findByUserId(String userId);
}