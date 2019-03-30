package com.sga.microservice.feedfetchservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
//import org.springframework.boot.context.properties.EnableConfigurationProperties;
//import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

//@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication//(exclude = {MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
//@EnableDiscoveryClient
public class FeedFetchServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FeedFetchServiceApplication.class, args);
	}

}

