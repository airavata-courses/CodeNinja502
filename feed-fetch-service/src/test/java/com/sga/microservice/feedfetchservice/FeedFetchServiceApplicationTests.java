package com.sga.microservice.feedfetchservice;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FeedFetchServiceApplicationTests {

	// private MockMvc mockMvc;

	// @MockBean
	// private final MediaController mc = new MediaController();

	@Test
	public void contextLoads() {

		/*
		 * when(mc.getAllURLS()).thenReturn(toString());
		 * 
		 * try { final MvcResult res = (MvcResult)
		 * mockMvc.perform(MockMvcRequestBuilders.get("/getLinks"))
		 * .andExpect(content().contentType(MediaType.APPLICATION_JSON));
		 * System.out.println(res.getResponse()); } catch (final Exception e) { // TODO
		 * Auto-generated catch block e.printStackTrace(); }
		 * 
		 * verify(mc, times(1)).getAllURLS(); verifyNoMoreInteractions(mc);
		 */
	}

}
