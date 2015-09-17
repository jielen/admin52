<%@ page contentType="text/html; charset=GB2312" %>
<%@ page import="com.anyi.gp.Pub" %>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<%@page import="com.anyi.gp.domain.User"%>
<%@page import="com.anyi.gp.sso.SessionContext"%>

<%
String token = (String) SessionUtils.getToken(request);
if(token == null){
  token = "";
}

String urlBuf = (String)request.getAttribute("url");
if(urlBuf == null || urlBuf.length() == 0){
  urlBuf = Pub.encodeUrl("/" + Pub.getWebRoot(request) + "/dispatcher.action?function=mainFrame&token=" + token);
}

%>

<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=GB2312">
<TITLE>资源本地化</TITLE>

<script>
function localComplete(){
	window.location.href = "<%=urlBuf%>";
}
</script>
</head>

<body leftMargin="0" rightMargin="0" topMargin="0">
	<br>
    正在检查服务器更新......
<iframe id="localResourceFrame" name="localResourceFrame" 
	width="200px" height="100" style="display:none;"
	src="/DB/jsp/DB/downzip.jsp?token=<%=token%>">
</iframe>

</body>
</html>
