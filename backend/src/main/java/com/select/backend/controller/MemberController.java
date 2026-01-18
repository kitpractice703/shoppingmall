package com.select.backend.controller;

import com.select.backend.domain.Member;
import com.select.backend.domain.MemberRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    private final MemberRepository memberRepository;

    // 회원가입 요청 데이터 형태
    @Data
    static class SignupRequest {
        private String userId;
        private String password;
        private String name;
        private String email;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerMember(@RequestBody SignupRequest request) {
        // 1. 아이디 중복 체크
        if (memberRepository.existsByUserId(request.getUserId())) {
            return ResponseEntity.badRequest().body("이미 존재하는 아이디입니다.");
        }

        // 2. 저장 (보안상 비밀번호 암호화가 필수지만, 우선 기능 구현을 위해 그대로 저장합니다)
        Member newMember = new Member(
                request.getUserId(),
                request.getPassword(),
                request.getName(),
                request.getEmail()
        );

        memberRepository.save(newMember);

        return ResponseEntity.ok("회원가입이 완료되었습니다.");


    }
    @Data
    static class LoginRequest {
        private String userId;
        private String password;
    }

    @PostMapping("/login")
    public ResponseEntity<Member> login(@RequestBody LoginRequest request) {
        // 1. 아이디로 회원 조회
        Member member = memberRepository.findByUserId(request.getUserId());

        // 2. 회원이 없거나 비밀번호가 틀리면 실패 처리 (401 Unauthorized)
        if (member == null || !member.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).build();
        }

        // 3. 성공하면 회원 정보 반환
        return ResponseEntity.ok(member);
    }
}