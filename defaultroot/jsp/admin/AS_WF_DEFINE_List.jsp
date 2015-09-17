<%@ page language="java" contentType="text/html; charset=GBK" %>

<%@ page import="com.anyi.gp.pub.SessionUtils" %>
<%@ page import="java.util.List" %>
<%@ page import="com.anyi.gp.pub.GeneralFunc"%>

<%  
    String designer = "WFDesigner";
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
    if(appNames == null || i == appNames.size()){
    	out.println("系统中不包含工作流设计的应用！要使用工作流设计应用系统，请先发布此系统。");
    }
    else{
    	response.sendRedirect("/WFDesigner/index.htm");
    	/*
    	out.println("<html>");
		out.println("<title> Workflow Designer </title>");
		out.println("<head>");
		out.println("</head>");
		out.println("<body>");
		out.println("<br><br><br><a href=\"wfdesignerJNLP\"><b>启动流程定义工具></b></a><br><br>");
		out.println("</body>");
		out.println("</html>");
		*/
    }

%>