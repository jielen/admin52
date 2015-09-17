<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@page import="com.anyi.gp.sso.SessionContext"%><html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
<%
	String token = request.getParameter("token");
	if(token != null){
		SessionContext sc = (SessionContext)session.getServletContext().getAttribute(token);
		out.println("currentUser:" + sc.getCurrentUser());
	}
%>
</body>
</html>