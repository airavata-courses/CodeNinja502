package com.sga.microservice.feedfetchservice;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class MediaController {
	

	private MediaRepository repository = new MediaRepository();
	  
	@GetMapping("/getLinks")
	public String getAllURLS() {
	    return repository.getURLS();
	  }

}
