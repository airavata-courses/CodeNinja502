package com.sga.microservice.feedfetchservice;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FeedFetchServiceApplicationTests {

	private MockMvc mockMvc;

	@MockBean
	private MediaController mc;

	@Test
	public void contextLoads() {

		when(mc.getAllURLS()).thenReturn(toString());

		try {
			final MvcResult res = (MvcResult) mockMvc.perform(MockMvcRequestBuilders.get("/getLinks"))
					.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON));
			System.out.println(res.getResponse());
		} catch (final Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		verify(mc, times(1)).getAllURLS();
		verifyNoMoreInteractions(mc);
	}

}
