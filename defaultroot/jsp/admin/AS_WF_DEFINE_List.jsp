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
    	
    	for(i = 0; i < appNames.size(); i++){//��������webӦ��
       String appName = (String)appNames.get(i);
       if(appName.equals(designer))
       	break;
    	}
    }
    if(appNames == null || i == appNames.size()){
    	out.println("ϵͳ�в�������������Ƶ�Ӧ�ã�Ҫʹ�ù��������Ӧ��ϵͳ�����ȷ�����ϵͳ��");
    }
    else{
    	response.sendRedirect("/WFDesigner/index.htm");
    	/*
    	out.println("<html>");
		out.println("<title> Workflow Designer </title>");
		out.println("<head>");
		out.println("</head>");
		out.println("<body>");
		out.println("<br><br><br><a href=\"wfdesignerJNLP\"><b>�������̶��幤��></b></a><br><br>");
		out.println("</body>");
		out.println("</html>");
		*/
    }

%>