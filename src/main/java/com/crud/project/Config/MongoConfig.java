package com.crud.project.Config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient() {
        String uri = "mongodb+srv://smartstock:smartD%40stock@smartstock.erkrji7.mongodb.net/?appName=smartstock";
        return MongoClients.create(uri);
    }
}