
<%@page contentType="text/html; charset=GBK"%>
<html>

<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> 
<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=gbk">
<title>权限设置</title>
</head>

<% 
	String userId = request.getParameter("userId");
    String roleId = request.getParameter("roleId");
    if(roleId == null) roleId = "";
	if(userId == null) userId = "";
%>
<frameset cols="256,*" frameborder=1 framespacing=1>
<frame name="privmenu" src="dispatcher.action?function=privmenu&userId=<%=userId%>&roleId=<%=roleId%>" target="content">
<frameset name="roleright" rows="*,0">
  <frame name="right" src="dispatcher.action?function=privleft&userId=<%=userId%>&roleId=<%=roleId%>" scrolling="yes">
  <frame name="bottom" src="" scrolling="yes">
  </frameset>
  <noframes>
  <body>

  <p>此网页使用了框架，但您的浏览器不支持框架。</p>

  </body>
  </noframes>
</frameset>

</html>
