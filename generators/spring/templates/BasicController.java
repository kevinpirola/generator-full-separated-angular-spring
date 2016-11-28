package <%=packageName%>;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BasicController {

	@RequestMapping(value = "/greet")
	public String getUser() {
		return "Hello my friend!";
	}
}
