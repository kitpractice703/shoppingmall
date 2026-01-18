package com.select.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // DB 관리용 고유 번호 (1, 2, 3...)

    @Column(unique = true, nullable = false)
    private String userId;   // 로그인할 때 쓸 아이디 (중복 불가)

    @Column(nullable = false)
    private String password; // 비밀번호

    private String name;     // 사용자 이름
    private String email;    // 이메일

    public Member(String userId, String password, String name, String email) {
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.email = email;
    }
}