package com.rohan.hackathon.datastax.backend.config;

import com.datastax.oss.driver.api.core.CqlSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Paths;

@Configuration
public class AstraConfig {

    @Bean
    public CqlSession cqlSession() {
        return CqlSession.builder()
                .withCloudSecureConnectBundle(Paths.get("src/main/resources/", "datastax-connect.zip"))
                .withAuthCredentials("user", "digitate-SNAPBACK-petard")
                .withKeyspace("application")
                .build();
    }

}
