<%@page contentType="text/html;charset=GBK"%>
<%@page import="com.anyi.gp.meta.CompoMetaBuilder" %>
<%@page import="com.anyi.gp.meta.TableMetaBuilder" %>
<%@page import="com.anyi.gp.pub.LangResource" %>
<%@page import="com.anyi.gp.pub.SessionUtils" %>
<html>

<head>
<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=GBK">
<title>����GRP��A++</title>
</head>
<body>
<center>
<%
  Object userName = SessionUtils.getAttribute(request, "svUserID");
  if (null == userName || !userName.toString().equals("sa")) {
    out.println("<h1>ֻ��ϵͳ����Ա(sa)��Ȩ���д˹��ߣ�</h1>");
  } else {

try {
  CompoMetaBuilder.clearMetaPool();
  TableMetaBuilder.clearMetaPool(); 
  //LangResource.getInstance().clear();
  out.println("<h1>���ݿ������Ļ���ͷ�����Ϣ�Ļ�������գ�</h1>");
}
catch (Exception e) {
  out.println("<h1>Error clearing MetaPool or LangResource!</h1>");
}

  }
%>

<p><a href="javascript:history.back();">����</a></p>
</center>
</body>
</html>
