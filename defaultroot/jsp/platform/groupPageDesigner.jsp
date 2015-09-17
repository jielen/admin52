<%@ page language="java" contentType="text/html; charset=GBK" %>

<%@ page import="com.anyi.gp.pub.SessionUtils" %>
<%@ page import="java.util.List" %>
<%@ page import="com.anyi.gp.pub.GeneralFunc"%>

<%  
		String token = (String) SessionUtils.getToken(request);
  	if(token == null){
  	token = "";
  	}
  	
  	String type = request.getParameter("type");
		String groupId = request.getParameter("groupId");
		String groupName = request.getParameter("groupName");
		if(groupName == null) groupName = "";
	
    String designer = "portal";
    int i = 0;
    ServletContext servletContext  = session.getServletContext();
    List appNames = (List)servletContext.getAttribute(SessionUtils.APP_NAME_LIST_KEY);
    if(appNames == null){
    	appNames = GeneralFunc.getAppNames();
    }
    if(appNames != null){
    	
    	for(i = 0; i < appNames.size(); i++){//遍历所有web应用
       String appName = (String)appNames.get(i);
       if(appName.equals(designer))
       	break;
    	}
    }
    
    String func = "editGroupPage";
    if(type != null && "conf".equals(type)){
    	func = "confGroupPage";
    }
    
    String iUrl = "";
    if(appNames == null || i == appNames.size()){
    	iUrl = "dispatcher.action?function=editGroupPage&groupId=" + groupId + "&groupName=" + groupName + "&token=" + token;
    }
    else{
    	iUrl = "/portal/dispatcher.action?function=" + func + "&groupId=" + groupId + "&groupName=" + groupName + "&token=" + token;
    }
    
		response.sendRedirect(iUrl);
%>