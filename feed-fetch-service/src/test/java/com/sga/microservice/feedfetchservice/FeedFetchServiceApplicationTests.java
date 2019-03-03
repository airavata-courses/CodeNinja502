package com.sga.microservice.feedfetchservice;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FeedFetchServiceApplicationTests {

	/*@Autowired
	MediaController mc;

	@LocalServerPort
	private int port;*/

	@Test
	public void contextLoads() {

		/*final RestTemplate restTemplate = new RestTemplate();
		
		final String baseUrl = "http://149.165.169.156:9090/getLinks";

		final ResponseEntity<String> result = restTemplate.getForEntity(baseUrl, String.class);
		System.out.println(result.getBody());
		Assert.assertEquals(200, result.getStatusCodeValue());*/
	}

}
