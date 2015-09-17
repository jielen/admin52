<%@page contentType="text/html; charset=GBK"%>
<%@page import="java.net.URL"%>
<%@page import="com.anyi.gp.pub.GeneralFunc"%>
<%@page import="java.net.MalformedURLException"%>
<%
	boolean success = true;//判断是否用户验证成功标识
	String errorInfo = "";
	if(success){
		String username = request.getParameter("username");//获取username，可以采用其他的方式获取
		if(username == null){
			errorInfo += "\n登录账号为空！";
		}else{			
			Object user = GeneralFunc.getLoginUser(username);
			if(user == null){
				errorInfo += "A++系统中没有对应的用户账号:" + username;
			}else{
				request.setAttribute("user", user);
			}
		}
	}
	
	if(success && errorInfo.length() == 0){
		RequestDispatcher rd = request.getRequestDispatcher("loginDispatcher.action");//转发到登录action
		rd.forward(request,response);
	}else{
		out.print(errorInfo);
	}
%>

<html>
  	<head>
    	<title>A++公共平台集成于第三方系统的登录转发页面</title>
  	</head>
  	<body>
 	</body>
</html>
