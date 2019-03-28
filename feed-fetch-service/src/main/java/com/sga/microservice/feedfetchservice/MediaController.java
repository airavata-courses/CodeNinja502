package com.sga.microservice.feedfetchservice;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class MediaController {

	private final MediaRepository repository = new MediaRepository();

	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/getLinks", method = RequestMethod.GET, produces = "application/json")
	public String getAllURLS() {
		return repository.getURLS();
	}

	/*@CrossOrigin(origins="*")
	@RequestMapping(value="/health",method=RequestMethod.GET)
	public String health(){return "working fine";}*/
}
