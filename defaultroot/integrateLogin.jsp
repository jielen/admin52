<%@page contentType="text/html; charset=GBK"%>
<%@page import="java.net.URL"%>
<%@page import="com.anyi.gp.pub.GeneralFunc"%>
<%@page import="java.net.MalformedURLException"%>
<%
	boolean success = true;//�ж��Ƿ��û���֤�ɹ���ʶ
	String errorInfo = "";
	if(success){
		String username = request.getParameter("username");//��ȡusername�����Բ��������ķ�ʽ��ȡ
		if(username == null){
			errorInfo += "\n��¼�˺�Ϊ�գ�";
		}else{			
			Object user = GeneralFunc.getLoginUser(username);
			if(user == null){
				errorInfo += "A++ϵͳ��û�ж�Ӧ���û��˺�:" + username;
			}else{
				request.setAttribute("user", user);
			}
		}
	}
	
	if(success && errorInfo.length() == 0){
		RequestDispatcher rd = request.getRequestDispatcher("loginDispatcher.action");//ת������¼action
		rd.forward(request,response);
	}else{
		out.print(errorInfo);
	}
%>

<html>
  	<head>
    	<title>A++����ƽ̨�����ڵ�����ϵͳ�ĵ�¼ת��ҳ��</title>
  	</head>
  	<body>
 	</body>
</html>
