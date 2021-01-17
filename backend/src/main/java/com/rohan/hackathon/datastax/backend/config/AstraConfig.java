package com.rohan.hackathon.datastax.backend.config;

import com.datastax.oss.driver.api.core.CqlSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Paths;

@Configuration
public class AstraConfig {

    @Value("${ASTRA_USERNAME}")
    private String userName;

    @Value("${ASTRA_PWD}")
    private String pwd;

    @Value("${APP_HOME}")
    private String appHome;


    @Bean
    public CqlSession cqlSession() {
        return CqlSession.builder()
                .withCloudSecureConnectBundle(Paths.get(appHome, "config", "datastax-connect.zip"))
                .withAuthCredentials(userName, pwd)
                .withKeyspace("application")
                .build();
    }

}
