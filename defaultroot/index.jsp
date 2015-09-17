<%@ page import="javax.servlet.RequestDispatcher"%>
<%
	//session.invalidate();

	Cookie[] cookies = request.getCookies();
	
	if (cookies != null) {
		for (int i = 0; i < cookies.length; i++) {
			String tempuid_1 = cookies[i].getName();
			if (tempuid_1.equals("GMAP-JSESSIONID")) {
				cookies[i].setMaxAge(0);
				cookies[i].setValue(null);
				cookies[i].setPath("/");
				response.addCookie(cookies[i]);
				//System.out.println("sdfsf");
			}
		}
	}
	RequestDispatcher rd = request
			.getRequestDispatcher("/UserPwdLogin.jsp");
	rd.forward(request, response);

	return;
%>