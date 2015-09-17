<%@page contentType="text/html; charset=GBK"%>
<%@page import="java.util.List"%>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<%@page import="com.anyi.gp.domain.User"%>
<%@page import="com.anyi.gp.domain.Group"%>
<%@page import="com.anyi.gp.sso.SessionContext"%>
<%@page import="com.anyi.gp.Pub"%>
<html>

<head>
<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=gbk">
<meta name="GENERATOR" content="Microsoft FrontPage 4.0">
<meta name="ProgId" content="FrontPage.Editor.Document">
<!--
<title>用友GRP—A++</title>
-->
</head>

<%
	String groupId = null;
	String token = (String) SessionUtils.getToken(request);
  	ServletContext context = session.getServletContext();
  	SessionContext sessionContext = (SessionContext) context.getAttribute(token);
  	User user = sessionContext.getCurrentUser();
  	List groupList = user.getGroupList();
  	if(groupList != null && !groupList.isEmpty()){
  	  groupId = ((Group)groupList.get(0)).getId();
  	}
	if(groupId == null) groupId = "";
	String titleUrl = Pub.encodeUrl("dispatcher.action?function=title&groupId=" + groupId + "&token=" + token);
%>
<script>
var show = '<%=SessionUtils.getAttribute(request, "checkID")%>';
var msg;
var start = 1;
var control;

function closeMyWindow(){
	var win=open("closewin");
  	if(win)
		win.close();
}
function doLoad(){
	if(show && show == "1"){
		frames["head"].setGlobal();
	}
	frames["head"].doLoad();
}
function closeMess(){
	frames["head"].closeMess();
}
function rtol() {
	if(!msg)
		return;

  	control = 1;
  	window.status = msg.substring(start, msg.length) + msg.substring(0, start);
  	start++;
  	if (start > msg.length) {
  		start = 0;
  	}
  	if(control == 1) {
  		window.setTimeout("rtol()", 500);
  	}
}
</script>
<frameset onUnload="" onload="doLoad()" rows="60,*,24,0" cols="*" frameborder="NO" border="0" framespacing="0" id="banner">
  <frame src="<%=titleUrl %>" id="head" scrolling="nO"  marginwidth="0" marginheight="0" noresize >
  <frameset cols="177,9,*" frameborder="NO" border="0" framespacing="0" name="index">
    <frame src="blank.html" id="treeframe" frameborder="no" scrolling="auto" scrolling-x="no" marginwidth="0" marginheight="0" noresize >
    <frame src="center.htm" name="centerFrame" frameborder="no" scrolling="no" scrolling-x="no" marginwidth="0" marginheight="0" noresize >
    <frame src="dispatcher.action?function=mainHome&token=<%=token%>" name="main" id="main" scrolling="auto" scrolling-x="no"  marginwidth="0" marginheight="0" noresize>	
  </frameset>
  <frame src="bottom.htm" name="bottomFrame" scrolling="no"  marginwidth="0" marginheight="0" noresize >
  <frame id="dog" action="closewin" src="blank.html">
</frameset>

<noframes><body>
</body></noframes>
</html>
