package com.select.backend;

import com.select.backend.domain.Mood;
import com.select.backend.domain.Product;
import com.select.backend.domain.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // [중요] 기존 데이터가 있으면 다 지우고 다시 시작 (이미지 URL 갱신을 위해)
        if (productRepository.count() > 0) {
            productRepository.deleteAll();
        }

        System.out.println("========== [데이터 리셋 및 재저장 시작] ==========");

        // 이미지 서비스를 placehold.co로 변경 (더 안정적)
        Product p1 = new Product("오프화이트 셔츠", "정제된 핏의 깔끔한 셔츠", 45000, "https://placehold.co/600x800/FFFFFF/000000?text=Minimal+Shirt", Mood.MINIMAL);
        Product p2 = new Product("캐시미어 니트", "따뜻하고 포근한 느낌", 89000, "https://placehold.co/600x800/F5F5DC/000000?text=Cozy+Knit", Mood.COZY);
        Product p3 = new Product("파스텔 크롭 가디건", "사랑스러운 컬러감", 52000, "https://placehold.co/600x800/FFB6C1/000000?text=Lovely+Cardigan", Mood.LOVELY);
        Product p4 = new Product("워싱 와이드 데님", "시간의 흔적이 담긴", 64000, "https://placehold.co/600x800/87CEEB/000000?text=Vintage+Denim", Mood.VINTAGE);
        Product p5 = new Product("더블 트렌치 코트", "변하지 않는 클래식", 129000, "https://placehold.co/600x800/D2B48C/000000?text=Classic+Coat", Mood.CLASSIC);
        Product p6 = new Product("그래픽 오버핏 후드", "자유로운 스트릿 무드", 78000, "https://placehold.co/600x800/333333/FFFFFF?text=Street+Hoodie", Mood.STREET);

        productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6));

        System.out.println("========== [데이터 리셋 및 재저장 완료] ==========");
    }
}