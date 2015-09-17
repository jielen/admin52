<%@page contentType="text/html;charset=GBK"%>
<%@page import="com.anyi.gp.license.LicenseManager"%>
<%@page import="com.anyi.gp.context.ApplusContext"%>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<%@page import="com.anyi.gp.pub.GeneralFunc"%>
<%@page import="java.util.List"%>
<%@page import="java.io.IOException"%>

<html>

	<head>

		<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=GBK">
		<title>用友GRP—A++</title>

	</head>

	<body>

		<center>

			<%
  Object userName = SessionUtils.getAttribute(request, "svUserID");
  if (null == userName || !userName.toString().equals("sa")) {
    userName = request.getRemoteUser();
  }
  if (null == userName || !userName.toString().equals("sa")) {
  out.println("<h1>只有系统管理员(sa)有权运行此工具！</h1>");
  } else {
    try {
        String host = request.getParameter("host");
            LicenseManager LicenseManager = (LicenseManager) ApplusContext.getBean("licenseManager");
        if (host != null) {
          int port = Integer.parseInt(request.getParameter("port"));
          out.println("<p>");
          if (host != null && host != "" && port > 0)
            
          out.println("</p>");
        }
        out.println(LicenseManager.getLincenseStatusInfo());
    
	    //同步license    
	    LicenseManager licenseManager = (LicenseManager) ApplusContext.getBean("licenseManager");
	    if(licenseManager.getLicenseStatus() == null)
	      return;
	    
	    ServletContext servletContext  = request.getSession().getServletContext();
	    List appNames = (List)servletContext.getAttribute(SessionUtils.APP_NAME_LIST_KEY);
	    if (appNames == null) {
	      appNames = GeneralFunc.getAppNames();
	    }
	    
	    if(appNames !=  null){ 
	      request.setAttribute("companyCount", licenseManager.getLicenseStatus().getCompanyCount() + "");
	      request.setAttribute("accountCount", licenseManager.getLicenseStatus().getAccountCount() + "");
	      request.setAttribute("allowedProducts", licenseManager.getLicenseStatus().getAllowedProducts());
	      
	      for(int i = 0; i < appNames.size(); i++){//遍历所有web应用
	        String appName = (String)appNames.get(i);
	        ServletContext sc = servletContext.getContext("/" + appName);
	        if(sc != null){
	          if(sc.getResourceAsStream("/syncLicense.jsp") != null){
	            RequestDispatcher proxyServlet = sc.getRequestDispatcher("/syncLicense.jsp");
	            try {
	              proxyServlet.include(request, response);
	            } catch (ServletException e) {
	              
	            } catch (IOException e) {
	              
	            }
	          }
	        }
	      }
	    }
    } catch (Exception e) {
    	e.printStackTrace();
      out.println("错误：修改加密服务参数时出错！");
    }
  }
%>

			<p></p>
			<p>
				<a href="javascript:history.back();">返回</a>
			</p>

		</center>

	</body>

</html>
