<%@ page language="java" contentType="text/html; charset=GBK"%>
<%@page import="java.util.List"%>
<%@page import="com.anyi.gp.pub.GeneralFunc"%>
<%@page import="com.anyi.gp.pub.LangResource"%>
<%
	List appNames = GeneralFunc.getAppNames();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<title>ϵͳѡ������</title>
</head>
<body>
<fieldset style="border-style: solid; border-width: 1px; padding: 2px">
  <legend>sql��־�������</legend>
	<table border="1" width="100%">
	  <thead>
	    <tr>
	      <td>ģ��</td>
	      <td>�Ƿ����</td>
	      <td>����ļ�</td>
	      <td>�ļ�����</td>
	    </tr>
	  </thead>
	  <tbody>
	  <% for (int i = 0; i < appNames.size(); i++){
		String appName = (String)appNames.get(i);
		if("WFDesigner".equals(appName) || "admin".equals(appName)
				|| "portal".equals(appName) || "style".equals(appName)){
			continue;
		}
	  %>
		<tr>
			<td><%=LangResource.getInstance().getLang((String)appNames.get(i)) %></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	  <%} %>
	</tbody>
	</table>
</fieldset>
</body>
</html>