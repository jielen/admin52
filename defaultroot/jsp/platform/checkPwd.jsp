<%@ page contentType="text/html; charset=GBK" %>
<%@ page language="java" %>

<%@page import="com.anyi.gp.pub.SessionUtils"%>
<%@page import="com.anyi.gp.domain.User"%>
<%@page import="com.anyi.gp.sso.SessionContext"%>
<%@page import="com.anyi.gp.pub.GeneralFunc"%>

<%@ taglib uri="/applus" prefix="applus" %>

<%
  String password = "";
  String userName = "";
  User user = null;	
  String userId = request.getParameter("userId");
  if(userId != null && userId.length() > 0){
  	user = GeneralFunc.getLoginUser(userId);
  }else{	
  	String token = (String) SessionUtils.getToken(request);
  	if(token == null){
  	  token = "";
    }
  	ServletContext context = session.getServletContext();
  	SessionContext sessionContext = (SessionContext) context.getAttribute(token);
  	user = sessionContext.getCurrentUser();
  }
  
  if(user != null){
  	password = user.getPassword();
  	userName = user.getUserName();
  }
  if(password.length() > 0){
    password = GeneralFunc.recodePwd(password);
  }
%>

<html>
<head>
<title><%=userName%>密码确认</title>
<LINK href="script/applus.css" rel="stylesheet" type="text/css">

<applus:include language="javascript">
    gp.page.TextBox;
    gp.page.TextAreaBox;
    gp.page.Toolbar;
    gp.default.Btn_EventAdapter;
</applus:include>

</head>

<applus:init>
  var voToolbar= toolbar.oOwner;
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
</applus:init>

<body onmouseup="" leftMargin="0" rightMargin="0" topMargin="0" class="pageBody" nowrap>
	
<applus:toolbar id="toolbar">
  <call id="fok" type="command" caption="确定" accesskey="O" isgranttoall="true" />
  <call id="fcancel" type="command" caption="取消" accesskey="C" isgranttoall="true" />
</applus:toolbar>

<script language="javascript">

  function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent) {
    switch (oCall.id){
      case "fok":
        return checkPass();
        break;
      case "fcancel":
        window.close();
        break;
    }
  }

</script>

<p></p>

<form name="checkPassword" method="post" action="">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
    <tr class="td">
      <td style="POSITION:absolute;left:140;top:120;"  class="normalFieldCaption">密码</td>
      <td style="POSITION:absolute;left:180;top:120;" class="td">
        <input type="password" class="normalFieldEditMain" name="password">
      </td>
    </tr>
  </table>
</form>
<applus:endpage />
</body>

<script>
	var pwd = "<%=password%>";
  function checkPass(){
  	var passwordValue = document.all("password").value;
  	if(passwordValue != pwd){
  		alert("密码错误！");
  		return;
  	}
  	window.returnValue = "true";
  	window.close();
  }
</script>

</html>
