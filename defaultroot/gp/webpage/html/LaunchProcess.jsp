<%@page language="java" contentType="text/html; charset=GBK" %>
<%@ page import="com.anyi.gp.*" %>
<%@taglib uri="/applus" prefix="applus"%>

<html>
<head>
<meta http-eq_iv="Content-Type" content="text/html; charset=gb2312" />
<title>请稍候...</title>

<applus:include language="javascript">
gp.page.Processbar;
</applus:include>

<script>
//----------------------------------------------------------------------
function pageInit(){
  var voOpener= window.dialogArguments;
  PageX.tIsForceOpenProcess= voOpener.PageX.tIsForceOpenProcess;
  PageX.tIsPrecessAutoRun= voOpener.PageX.tIsPrecessAutoRun;
  var voRect= PF.getCenterRect(400, 100);
  var vsStyle= "menubar= no, toolbar= no, scrollbars= no, "
             + "resizable=no, resizable= no, titlebar= no, "
             + "left= "+ voRect.iLeft+ "px, top= "+ voRect.iTop+ "px, "
             + "width= "+ voRect.iWidth+ "px, height= "+ voRect.iHeight+ "px";
	var voProcessWin= open("/<%=Pub.getWebRoot(request)%>/gp/webpage/html/RunProcess.jsp", "_blank", vsStyle);
	voProcessWin.focus();
	voOpener.PageX.oProcessWin= voProcessWin;
}
//----------------------------------------------------------------------
function closeWin(){
  var voOpener= window.dialogArguments;
	voOpener.PageX.oProcessbar= PageX.oProcessbar;
	window.close();
}
//----------------------------------------------------------------------
</script>
</head>

<body bgcolor="#C0C0C0" onload="pageInit();">
</body>
</html>
