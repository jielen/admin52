<%@ page contentType="text/html; charset=GBK" %>
<%@page import="com.anyi.gp.pub.SessionUtils"%>

<%
	//String token = SessionUtils.getToken(request);
	String url = request.getParameter("url");
    String userId = request.getParameter("userid");
    //if((token != null && token.length() != 0) && (userId == null || userId.length() == 0)){
    //	userId = SessionUtils.getAttribute(request, "svUserID");
    //}
    
    //request.setAttribute("token", token);
    request.setAttribute("username", userId);
    request.setAttribute("url", url);
    
	RequestDispatcher rd = request.getRequestDispatcher("/admin/loginDispatcher.action");
	rd.forward(request,response);
%>