<%@ page contentType="text/html; charset=GBK" %>
<%@ page language="java" %>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>任务提示</title>
</head>

<style>
.boldf{
	font-family: "黑体";
}

A.taskList{
  color:black;
	font : 14px 宋体;
  cursor: hand;
  text-decoration:none;
}
A.taskList:hover{
  color:red;
}
<!--A.more{
  color:gray;
	font : 12px 宋体;
  cursor: hand;
  text-decoration:none;
}
A.more:hover{
  color:red;
}
-->
li{
word-wrap:break-word;

}
td{
word-wrap:break-word;
word-break:break-all
}
</style>
<SCRIPT language="javascript" src="script/Menu.js"></SCRIPT>
<SCRIPT language="javascript">
	
  //禁止弹出式菜单;leidh;20040618;
  document.oncontextmenu= function(){event.returnValue= true;};
  document.onmousedown=desktopMenuEvent;
  var pageNumber=0;
  function task_click(uniqueId,url){
      pageNumber++;
      var win_edit = open(url,"L" + uniqueId + pageNumber,
                        "menubar=no,scrollbars=no,status=no,toolbar=no," +
                        "resizable=yes,titlebar=yes,scrollbars=yes," +
                        "height=" + (screen.availHeight - 30) + ",width=" +
                        (screen.availWidth - 10) + ",top=0,left=0");
  }
  function simpleSearch(){
  	window.location.replace("main.jsp");
  }
</script>
<jsp:useBean id="DeskTopBeanId" scope="page" class="com.anyi.gp.desktop.DeskTopBean" />
<%
  ServletContext context = this.getServletConfig().getServletContext();
  request.setAttribute("contextFacade", context);
  
  String userName = SessionUtils.getAttribute(request,"svUserID");

  DeskTopBeanId.setRequest(request);
  DeskTopBeanId.setLang("C");
  DeskTopBeanId.setUserID(userName);
  DeskTopBeanId.init();

  String token = (String) SessionUtils.getToken(request);
  if(token == null){
  	token = "";
  }
%>
<script language="JavaScript">
var TOKEN = '<%=token%>';
</script>
<body leftMargin="0" rightMargin="0" topMargin="0" scrolling="NO">
	<!--zhangys 2004-06-25 首页加上标记 -->
	<span id=welcome_page value="welcome_page"></span>
	<table  border="0" cellpadding="0" cellspacing="0" width="100%">
  	<tr>
    	<td width="50%" align="left" background="/style/img/main/mainhybg.gif"><img src="/style/img/main/mainhy.gif" width="320" height="75"></td>
  	</tr>
	</table>
	<table border="0" valign="top" cellpadding="0" cellspacing="0" width="100%" height="84%">
		<jsp:getProperty name="DeskTopBeanId" property="desktophtml" />
  </table>
 </body>
</html>
