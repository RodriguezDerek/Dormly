package com.dormly.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // This makes Spring load application-test.properties
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
