<%@page contentType="text/html;charset=GBK"%>
<%@page import="com.anyi.gp.meta.CompoMetaBuilder" %>
<%@page import="com.anyi.gp.meta.TableMetaBuilder" %>
<%@page import="com.anyi.gp.pub.LangResource" %>
<%@page import="com.anyi.gp.pub.SessionUtils" %>
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
    out.println("<h1>只有系统管理员(sa)有权运行此工具！</h1>");
  } else {

try {
  CompoMetaBuilder.clearMetaPool();
  TableMetaBuilder.clearMetaPool(); 
  //LangResource.getInstance().clear();
  out.println("<h1>数据库描述的缓冲和翻译信息的缓冲已清空！</h1>");
}
catch (Exception e) {
  out.println("<h1>Error clearing MetaPool or LangResource!</h1>");
}

  }
%>

<p><a href="javascript:history.back();">返回</a></p>
</center>
</body>
</html>
