<%@page contentType="text/html;charset=GBK"%>
<%@page import="com.anyi.gp.license.LicenseManager"%>
<%@page import="com.anyi.gp.context.ApplusContext"%>
<%@page import="com.anyi.gp.pub.SessionUtils"%>

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
            LicenseManager licenseManager = (LicenseManager) ApplusContext.getBean("licenseManager");
        if (host != null) {
          int port = Integer.parseInt(request.getParameter("port"));
          out.println("<p>");
          if (host != null && host != "" && port > 0)
            licenseManager.startWebService(host, port);
          out.println("</p>");
        }
        out.println(licenseManager.getLincenseStatusInfo());
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
