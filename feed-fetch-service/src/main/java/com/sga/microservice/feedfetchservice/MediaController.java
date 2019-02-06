package com.sga.microservice.feedfetchservice;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class MediaController {
	

	private MediaRepository repository = new MediaRepository();
	  
	@RequestMapping(value = "/getLinks", method = RequestMethod.GET, produces = "application/json")
	public String getAllURLS() {
	    return repository.getURLS();
	  }

}
